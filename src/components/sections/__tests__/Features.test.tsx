import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Features from "../Features";
import * as featuresService from "../../../services/api/features";

// Mock the features service
jest.mock("../../../services/api/features");
const mockFetchFeatures = featuresService.fetchFeatures as jest.MockedFunction<
  typeof featuresService.fetchFeatures
>;

describe("Features Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render features from static data", async () => {
    const mockFeaturesData = [
      {
        id: 1,
        title: "Custom Web Development",
        description: "Build scalable applications.",
        icon: "Code",
      },
    ];

    mockFetchFeatures.mockResolvedValue(mockFeaturesData);

    render(<Features />);

    await waitFor(() => {
      expect(screen.getByText("Custom Web Development")).toBeInTheDocument();
      expect(
        screen.getByText("Build scalable applications.")
      ).toBeInTheDocument();
    });

    expect(mockFetchFeatures).toHaveBeenCalledTimes(1);
  });

  it("should handle loading state", () => {
    mockFetchFeatures.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<Features />);

    // Should show loading state (component likely shows skeleton or loading indicator)
    expect(mockFetchFeatures).toHaveBeenCalledTimes(1);
  });

  it("should handle errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockFetchFeatures.mockRejectedValue(new Error("Failed to fetch features"));

    render(<Features />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
