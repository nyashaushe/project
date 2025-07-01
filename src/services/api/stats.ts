// src/services/api/stats.ts
import axios from 'axios';

export interface Stat {
  id: number;
  icon: string; // e.g., 'users', 'calendar', etc. (to map to icon components)
  value: string;
  label: string;
}

export async function fetchStats(): Promise<Stat[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stats`);
    // Adjust data path as per Strapi response structure
    return res.data.data.map((item: any) => ({
      id: item.id,
      icon: item.attributes.icon,
      value: item.attributes.value,
      label: item.attributes.label,
    }));
  } catch (error) {
    throw new Error('Failed to fetch stats');
  }
}
