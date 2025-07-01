import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export async function fetchServices(): Promise<Service[]> {
  const response = await axios.get(`${API_URL}/services`);
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}
