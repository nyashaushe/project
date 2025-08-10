import { getStaticData, ApiResponse } from "../clientDataService";

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
  return await getStaticData<TeamMember>("team");
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
  return await getStaticData<CompanyValue>("values");
};
