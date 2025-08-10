import { fetchTestimonials, submitTestimonial } from "../testimonial";
import * as dataService from "../../dataService";

// Mock the dataService
jest.mock("../../dataService");
const mockDataService = dataService as jest.Mocked<typeof dataService>;

describe("testimonial service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTestimonials", () => {
    it("should fetch testimonials with default parameters", async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            content: "Great service!",
            author: "John Doe",
            role: "CEO",
            company: "Test Corp",
            rating: 5,
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

      const result = await fetchTestimonials();

      expect(mockDataService.getStaticData).toHaveBeenCalledWith(
        "testimonials",
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it("should fetch testimonials with custom parameters", async () => {
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
          rating: { $gte: 4 },
        },
      };

      const result = await fetchTestimonials(params);

      expect(mockDataService.getStaticData).toHaveBeenCalledWith(
        "testimonials",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle errors from data service", async () => {
      const error = new Error("Data service error");
      mockDataService.getStaticData.mockRejectedValue(error);

      await expect(fetchTestimonials()).rejects.toThrow("Data service error");
    });
  });

  describe("submitTestimonial", () => {
    it("should throw error indicating API routes should be used", async () => {
      const testimonialData = {
        content: "Great service!",
        author: "John Doe",
        role: "CEO",
        company: "Test Corp",
        rating: 5,
      };

      await expect(submitTestimonial(testimonialData)).rejects.toThrow(
        "Testimonial submission not implemented - use API routes instead"
      );
    });
  });
});
