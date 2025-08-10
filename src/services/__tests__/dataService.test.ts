import { promises as fs } from "fs";
import path from "path";
import { getStaticData, getStaticItem, DataServiceError } from "../dataService";
import { beforeEach } from "node:test";

// Mock fs module
jest.mock("fs", () => ({
  promises: {
    access: jest.fn(),
    readFile: jest.fn(),
  },
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe("dataService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getStaticData", () => {
    const mockData = {
      data: [
        {
          id: 1,
          title: "Test Item 1",
          category: "tech",
          publishedAt: "2023-01-01",
        },
        {
          id: 2,
          title: "Test Item 2",
          category: "design",
          publishedAt: "2023-01-02",
        },
        {
          id: 3,
          title: "Another Test",
          category: "tech",
          publishedAt: "2023-01-03",
        },
      ],
      meta: {
        pagination: {
          total: 3,
          page: 1,
          pageSize: 10,
        },
      },
    };

    it("should successfully load and return static data", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test");

      expect(mockFs.access).toHaveBeenCalledWith(
        path.join(process.cwd(), "data", "test.json")
      );
      expect(mockFs.readFile).toHaveBeenCalledWith(
        path.join(process.cwd(), "data", "test.json"),
        "utf-8"
      );
      expect(result.data).toEqual(mockData.data);
      expect(result.meta?.pagination?.total).toBe(3);
    });

    it("should throw FILE_NOT_FOUND error when file does not exist", async () => {
      mockFs.access.mockRejectedValue(new Error("File not found"));

      await expect(getStaticData("nonexistent")).rejects.toThrow(
        new DataServiceError(
          "Data file not found: nonexistent.json",
          "FILE_NOT_FOUND"
        )
      );
    });

    it("should throw INVALID_JSON error for malformed JSON", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue("invalid json content");

      await expect(getStaticData("invalid")).rejects.toThrow(
        new DataServiceError(
          "Invalid JSON format in invalid.json",
          "INVALID_JSON"
        )
      );
    });

    it("should throw INVALID_STRUCTURE error when data is not an array", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(
        JSON.stringify({ data: "not an array" })
      );

      await expect(getStaticData("invalid-structure")).rejects.toThrow(
        new DataServiceError(
          "Invalid data structure in invalid-structure.json - expected data array",
          "INVALID_STRUCTURE"
        )
      );
    });

    it("should apply pagination correctly", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test", {
        pagination: { page: 2, pageSize: 1 },
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(mockData.data[1]);
      expect(result.meta?.pagination).toEqual({
        total: 3,
        page: 2,
        pageSize: 1,
      });
    });

    it("should apply simple filters correctly", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test", {
        filters: { category: "tech" },
      });

      expect(result.data).toHaveLength(2);
      expect(result.data.every((item) => item.category === "tech")).toBe(true);
    });

    it("should apply $containsi filters correctly", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test", {
        filters: { title: { $containsi: "test" } },
      });

      expect(result.data).toHaveLength(3);
    });

    it("should apply $or filters correctly", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test", {
        filters: {
          $or: [{ category: "tech" }, { title: { $containsi: "another" } }],
        },
      });

      // Should match: 2 tech items + 1 item with "another" in title (which is also tech)
      // So total should be 2 unique items (both tech items match the OR condition)
      expect(result.data).toHaveLength(2);
      expect(result.data.every((item) => item.category === "tech")).toBe(true);
    });

    it("should apply sorting correctly", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test", {
        sort: "title:desc",
      });

      expect(result.data[0].title).toBe("Test Item 2");
      expect(result.data[1].title).toBe("Test Item 1");
      expect(result.data[2].title).toBe("Another Test");
    });

    it("should combine filters, sorting, and pagination", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticData("test", {
        filters: { category: "tech" },
        sort: "publishedAt:desc",
        pagination: { page: 1, pageSize: 1 },
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(3); // Latest tech item
      expect(result.meta?.pagination?.total).toBe(2); // Total filtered items
    });
  });

  describe("getStaticItem", () => {
    const mockData = {
      data: [
        { id: 1, title: "Test Item 1", category: "tech" },
        { id: 2, title: "Test Item 2", category: "design" },
      ],
      meta: {
        pagination: {
          total: 2,
          page: 1,
          pageSize: 10,
        },
      },
    };

    it("should successfully return a single item by ID", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await getStaticItem("test", 1);

      expect(result.data).toEqual(mockData.data[0]);
      // Meta will be recalculated by getStaticData, so check the structure instead
      expect(result.meta?.pagination?.total).toBe(2);
      expect(result.meta?.pagination?.page).toBe(1);
    });

    it("should throw ITEM_NOT_FOUND error when item does not exist", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      await expect(getStaticItem("test", 999)).rejects.toThrow(
        new DataServiceError(
          "Item with ID 999 not found in test",
          "ITEM_NOT_FOUND"
        )
      );
    });

    it("should propagate file errors from getStaticData", async () => {
      mockFs.access.mockRejectedValue(new Error("File not found"));

      await expect(getStaticItem("nonexistent", 1)).rejects.toThrow(
        new DataServiceError(
          "Data file not found: nonexistent.json",
          "FILE_NOT_FOUND"
        )
      );
    });
  });

  describe("DataServiceError", () => {
    it("should create error with message and code", () => {
      const error = new DataServiceError("Test message", "TEST_CODE");

      expect(error.message).toBe("Test message");
      expect(error.code).toBe("TEST_CODE");
      expect(error.name).toBe("DataServiceError");
      expect(error instanceof Error).toBe(true);
    });
  });

  describe("edge cases and error handling", () => {
    it("should handle empty data arrays", async () => {
      const emptyData = {
        data: [],
        meta: { pagination: { total: 0, page: 1, pageSize: 10 } },
      };
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(emptyData));

      const result = await getStaticData("empty");

      expect(result.data).toEqual([]);
      expect(result.meta?.pagination?.total).toBe(0);
    });

    it("should handle missing meta information", async () => {
      const dataWithoutMeta = { data: [{ id: 1, title: "Test" }] };
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(dataWithoutMeta));

      const result = await getStaticData("no-meta");

      expect(result.data).toHaveLength(1);
      expect(result.meta?.pagination?.total).toBe(1);
    });

    it("should handle file read errors", async () => {
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockRejectedValue(new Error("Permission denied"));

      await expect(getStaticData("permission-error")).rejects.toThrow(
        new DataServiceError(
          "Failed to load data for permission-error: Permission denied",
          "LOAD_ERROR"
        )
      );
    });

    it("should handle complex filter operations", async () => {
      const complexData = {
        data: [
          { id: 1, tags: ["react", "typescript"], status: "published" },
          { id: 2, tags: ["vue", "javascript"], status: "draft" },
          { id: 3, tags: ["react", "javascript"], status: "published" },
        ],
      };
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(complexData));

      const result = await getStaticData("complex", {
        filters: {
          tags: "react",
          status: { $eq: "published" },
        },
      });

      expect(result.data).toHaveLength(2);
      expect(
        result.data.every(
          (item) => item.tags.includes("react") && item.status === "published"
        )
      ).toBe(true);
    });
  });
});
