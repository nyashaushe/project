// src/services/api/techstack.ts
import axios from 'axios';

export interface TechStackItem {
  id: number;
  name: string;
  icon: string; // Store icon name or type in Strapi
}

export async function fetchTechStack(): Promise<TechStackItem[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/tech-stacks`);
    // Adjust data path as per Strapi response structure
    return res.data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      icon: item.attributes.icon,
    }));
  } catch (error) {
    throw new Error('Failed to fetch tech stack');
  }
}
