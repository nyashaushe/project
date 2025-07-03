import { fetchCollection } from './apiService';

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchFeatures = () => fetchCollection<Feature>('features');
