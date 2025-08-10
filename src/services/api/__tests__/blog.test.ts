import { fetchBlogPosts, fetchBlogPost } from "../blog";
import * as dataService from "../../dataService";

// Mock the dataService
jest.mock("../../dataService");
const mockDataService = dataService as jest.Mocked<typeof dataService>;

describe("blog service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchBlogPosts", () => {
    it("should fetch blog posts with default parameters", async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            title: "Test Post",
            content: "Test content",
            author: "Test Author",
            categories: ["Test"],
            publishedAt: "2024-01-01T00:00:00Z",
          },
        ],
        meta: {
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
          },
        },
      };

      mockDataService.getStaticData.mockResolvedValue(mockResponse);

      const result = await fetchBlogPosts();

      expect(mockDataService.getStaticData).toHaveBeenCalledWith("blog", {
        pagination: undefined,
        sort: undefined,
        filters: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should fetch blog posts with custom parameters", async () => {
      const mockResponse = {
        data: [],
        meta: {
          pagination: {
            total: 0,
            page: 1,
            pageSize: 5,
          },
        },
      };

      mockDataService.getStaticData.mockResolvedValue(mockResponse);

      const params = {
        pagination: { page: 1, pageSize: 5 },
        sort: "publishedAt:desc",
        filters: {
          categories: { $containsi: "React" },
        },
      };

      const result = await fetchBlogPosts(params);

      expect(mockDataService.getStaticData).toHaveBeenCalledWith(
        "blog",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle search filters correctly", async () => {
      const mockResponse = {
        data: [],
        meta: {
          pagination: {
            total: 0,
            page: 1,
            pageSize: 10,
          },
        },
      };

      mockDataService.getStaticData.mockResolvedValue(mockResponse);

      const params = {
        filters: {
          $or: [
            { title: { $containsi: "react" } },
            { content: { $containsi: "react" } },
          ],
        },
      };

      const result = await fetchBlogPosts(params);

      expect(mockDataService.getStaticData).toHaveBeenCalledWith(
        "blog",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("fetchBlogPost", () => {
    it("should fetch a single blog post by ID", async () => {
      const mockPost = {
        id: 1,
        title: "Test Post",
        content: "Test content",
        author: "Test Author",
        categories: ["Test"],
        publishedAt: "2024-01-01T00:00:00Z",
      };

      const mockResponse = {
        data: mockPost,
        meta: {
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10,
          },
        },
      };

      mockDataService.getStaticItem.mockResolvedValue(mockResponse);

      const result = await fetchBlogPost(1);

      expect(mockDataService.getStaticItem).toHaveBeenCalledWith("blog", 1);
      expect(result).toEqual(mockResponse);
    });

    it("should propagate errors from data service", async () => {
      const error = new Error("Post not found");
      mockDataService.getStaticItem.mockRejectedValue(error);

      await expect(fetchBlogPost(999)).rejects.toThrow("Post not found");
    });
  });
});
