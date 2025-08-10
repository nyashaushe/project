/**
 * Integration test to verify all migrated services work correctly
 */

import { fetchFeatures } from "../features";
import { fetchServices } from "../services";
import { fetchPortfolioItems } from "../portfolio";
import { fetchPricingPlans } from "../pricing";
import { fetchTechStack } from "../techstack";
import { fetchStats } from "../stats";
import { fetchPodcasts, fetchPodcast } from "../podcast";

// Mock fetch for the client data service
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("Services Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockResponse = (data: any[]) =>
    ({
      ok: true,
      json: async () => ({
        data,
        meta: { pagination: { total: data.length, page: 1, pageSize: 10 } },
      }),
    } as Response);

  it("should fetch features successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([
        { id: 1, title: "Test Feature", description: "Test", icon: "Code" },
      ])
    );

    const result = await fetchFeatures();
    expect(mockFetch).toHaveBeenCalledWith("/data/features.json");
    expect(result.data).toHaveLength(1);
  });

  it("should fetch services successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([
        { id: 1, title: "Test Service", description: "Test", icon: "Globe" },
      ])
    );

    const result = await fetchServices();
    expect(mockFetch).toHaveBeenCalledWith("/data/services.json");
    expect(result.data).toHaveLength(1);
  });

  it("should fetch portfolio items successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([
        {
          id: 1,
          title: "Test Project",
          description: "Test",
          image: "/test.jpg",
        },
      ])
    );

    const result = await fetchPortfolioItems();
    expect(mockFetch).toHaveBeenCalledWith("/data/portfolio.json");
    expect(result.data).toHaveLength(1);
  });

  it("should fetch pricing plans successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([
        {
          id: 1,
          name: "Starter",
          price: "$100",
          description: "Test",
          features: [],
        },
      ])
    );

    const result = await fetchPricingPlans();
    expect(mockFetch).toHaveBeenCalledWith("/data/pricing.json");
    expect(result.data).toHaveLength(1);
  });

  it("should fetch tech stack successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([{ id: 1, name: "React", icon: "react" }])
    );

    const result = await fetchTechStack();
    expect(mockFetch).toHaveBeenCalledWith("/data/techstack.json");
    expect(result.data).toHaveLength(1);
  });

  it("should fetch stats successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([
        { id: 1, icon: "Users", value: "100+", label: "Clients" },
      ])
    );

    const result = await fetchStats();
    expect(mockFetch).toHaveBeenCalledWith("/data/stats.json");
    expect(result.data).toHaveLength(1);
  });

  it("should fetch podcasts successfully", async () => {
    mockFetch.mockResolvedValueOnce(
      createMockResponse([
        {
          id: 1,
          title: "Test Podcast",
          description: "Test",
          publishedAt: "2024-01-01",
        },
      ])
    );

    const result = await fetchPodcasts();
    expect(mockFetch).toHaveBeenCalledWith("/data/podcasts.json");
    expect(result.data).toHaveLength(1);
  });
});
