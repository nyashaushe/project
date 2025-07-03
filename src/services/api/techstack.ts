import { fetchCollection } from './apiService';

export interface TechStackItem {
  id: number;
  name: string;
  icon: string;
}

export const fetchTechStack = () => fetchCollection<TechStackItem>('tech-stacks');
