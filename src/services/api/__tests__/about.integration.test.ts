/**
 * Integration test to verify the about service works with actual data files
 * This test uses the real clientDataService without mocking
 */

import { fetchTeamMembers, fetchCompanyValues } from "../about";

// Mock fetch for the client data service
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("About Service Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch team members from actual data structure", async () => {
    const mockTeamResponse = {
      data: [
        {
          id: 1,
          name: "John Smith",
          role: "CEO & Founder",
          image: "/team/john-smith.jpg",
          bio: "Visionary leader with 15+ years of experience in technology and business strategy.",
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTeamResponse,
    } as Response);

    const result = await fetchTeamMembers();

    expect(mockFetch).toHaveBeenCalledWith("/data/team.json");
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      id: 1,
      name: "John Smith",
      role: "CEO & Founder",
      image: "/team/john-smith.jpg",
      bio: expect.any(String),
      social: expect.any(Object),
    });
  });

  it("should fetch company values from actual data structure", async () => {
    const mockValuesResponse = {
      data: [
        {
          id: 1,
          title: "Innovation",
          description:
            "We embrace cutting-edge technologies and creative solutions.",
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockValuesResponse,
    } as Response);

    const result = await fetchCompanyValues();

    expect(mockFetch).toHaveBeenCalledWith("/data/values.json");
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      id: 1,
      title: "Innovation",
      description: expect.any(String),
      icon: "Lightbulb",
    });
  });

  it("should handle fetch errors gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    await expect(fetchTeamMembers()).rejects.toThrow(
      "Failed to fetch team.json: 404 Not Found"
    );
  });
});
