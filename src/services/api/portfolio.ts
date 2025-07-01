import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await axios.get(`${API_URL}/portfolio-items`);
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}
