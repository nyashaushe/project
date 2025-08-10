import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AboutPage from "../AboutPage";
import * as aboutService from "../../../services/api/about";

// Mock the about service
jest.mock("../../../services/api/about");
const mockFetchTeamMembers =
  aboutService.fetchTeamMembers as jest.MockedFunction<
    typeof aboutService.fetchTeamMembers
  >;
const mockFetchCompanyValues =
  aboutService.fetchCompanyValues as jest.MockedFunction<
    typeof aboutService.fetchCompanyValues
  >;

// Mock Next.js Image component
jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe("AboutPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render team members and company values", async () => {
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

    mockFetchTeamMembers.mockResolvedValue(mockTeamData);
    mockFetchCompanyValues.mockResolvedValue(mockValuesData);

    render(<AboutPage />);

    // Wait for data to load and check if content is rendered
    await waitFor(() => {
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(screen.getByText("Our Values")).toBeInTheDocument();
      expect(screen.getByText("Our Team")).toBeInTheDocument();
    });

    // Check if team member is rendered
    await waitFor(() => {
      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText("CEO & Founder")).toBeInTheDocument();
    });

    // Check if company value is rendered
    await waitFor(() => {
      expect(screen.getByText("Innovation")).toBeInTheDocument();
      expect(
        screen.getByText("We embrace cutting-edge technologies.")
      ).toBeInTheDocument();
    });

    // Verify service calls
    expect(mockFetchTeamMembers).toHaveBeenCalledTimes(1);
    expect(mockFetchCompanyValues).toHaveBeenCalledTimes(1);
  });

  it("should handle loading state", () => {
    mockFetchTeamMembers.mockImplementation(() => new Promise(() => {})); // Never resolves
    mockFetchCompanyValues.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<AboutPage />);

    // Should render the page structure even while loading
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Our Values")).toBeInTheDocument();
    expect(screen.getByText("Our Team")).toBeInTheDocument();
  });

  it("should handle errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockFetchTeamMembers.mockRejectedValue(new Error("Failed to fetch team"));
    mockFetchCompanyValues.mockRejectedValue(
      new Error("Failed to fetch values")
    );

    render(<AboutPage />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch about page data:",
        expect.any(Error)
      );
    });

    // Page should still render basic structure
    expect(screen.getByText("About Us")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
