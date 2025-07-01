import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: Record<string, string>;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await axios.get(`${API_URL}/team-members`);
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string; // Store icon name or type in Strapi
}

export async function fetchCompanyValues(): Promise<CompanyValue[]> {
  const response = await axios.get(`${API_URL}/company-values`);
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}
