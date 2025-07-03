import { fetchCollection } from './apiService';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchServices = () => fetchCollection<Service>('services');
