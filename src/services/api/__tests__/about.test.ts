import { fetchTeamMembers, fetchCompanyValues } from "../about";
import { getStaticData } from "../../clientDataService";

// Mock the clientDataService
jest.mock("../../clientDataService");
const mockGetStaticData = getStaticData as jest.MockedFunction<
  typeof getStaticData
>;

describe("About Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTeamMembers", () => {
    it("should fetch team members from static data", async () => {
      const mockTeamData = {
        data: [
          {
            id: 1,
            name: "John Smith",
            role: "CEO & Founder",
            image: "/team/john-smith.jpg",
            bio: "Visionary leader with 15+ years of experience.",
            social: {
              linkedin: "https://linkedin.com/in/johnsmith",
              twitter: "https://twitter.com/johnsmith",
            },
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

      mockGetStaticData.mockResolvedValue(mockTeamData);

      const result = await fetchTeamMembers();

      expect(mockGetStaticData).toHaveBeenCalledWith("team");
      expect(result).toEqual(mockTeamData);
    });

    it("should handle errors when fetching team members", async () => {
      const mockError = new Error("Failed to load team data");
      mockGetStaticData.mockRejectedValue(mockError);

      await expect(fetchTeamMembers()).rejects.toThrow(
        "Failed to load team data"
      );
      expect(mockGetStaticData).toHaveBeenCalledWith("team");
    });
  });

  describe("fetchCompanyValues", () => {
    it("should fetch company values from static data", async () => {
      const mockValuesData = {
        data: [
          {
            id: 1,
            title: "Innovation",
            description: "We embrace cutting-edge technologies.",
            icon: "Lightbulb",
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

      mockGetStaticData.mockResolvedValue(mockValuesData);

      const result = await fetchCompanyValues();

      expect(mockGetStaticData).toHaveBeenCalledWith("values");
      expect(result).toEqual(mockValuesData);
    });

    it("should handle errors when fetching company values", async () => {
      const mockError = new Error("Failed to load values data");
      mockGetStaticData.mockRejectedValue(mockError);

      await expect(fetchCompanyValues()).rejects.toThrow(
        "Failed to load values data"
      );
      expect(mockGetStaticData).toHaveBeenCalledWith("values");
    });
  });
});
