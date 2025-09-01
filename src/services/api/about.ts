export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: Record<string, string>;
}

export const fetchTeamMembers = async (): Promise<
  ApiResponse<TeamMember[]>
> => {
  try {
    const response = await fetch('/api/team');
    if (!response.ok) {
      throw new Error('Failed to fetch team members');
    }
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const fetchCompanyValues = async (): Promise<
  ApiResponse<CompanyValue[]>
> => {
  // Company values would need a dedicated API route if needed
  // For now, return empty array
  return { data: [], success: true };
};
