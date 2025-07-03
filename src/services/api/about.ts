import { fetchCollection } from './apiService';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: Record<string, string>;
}

export const fetchTeamMembers = () => fetchCollection<TeamMember>('team-members');

export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const fetchCompanyValues = () => fetchCollection<CompanyValue>('company-values');
