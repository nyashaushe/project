import { fetchCollection } from './apiService';

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export const fetchPortfolioItems = () => fetchCollection<PortfolioItem>('portfolio-items');
