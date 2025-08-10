import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import About from "../About";
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

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

describe("About Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render team members and company values", async () => {
    const mockTeamData = [
      {
        id: 1,
        name: "John Smith",
        role: "CEO & Founder",
        image: "/team/john-smith.jpg",
        bio: "Visionary leader.",
        social: {
          linkedin: "https://linkedin.com/in/johnsmith",
        },
      },
    ];

    const mockValuesData = [
      {
        id: 1,
        title: "Innovation",
        description: "We embrace cutting-edge technologies.",
        icon: "Lightbulb",
      },
    ];

    mockFetchTeamMembers.mockResolvedValue(mockTeamData);
    mockFetchCompanyValues.mockResolvedValue(mockValuesData);

    render(<About />);

    await waitFor(() => {
      expect(screen.getByText("About Baobab Stack")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText("Innovation")).toBeInTheDocument();
    });
  });
});
