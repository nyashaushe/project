import { fetchCollection } from './apiService';

export interface Stat {
  id: number;
  icon: string;
  value: string;
  label: string;
}

export const fetchStats = () => fetchCollection<Stat>('stats');
