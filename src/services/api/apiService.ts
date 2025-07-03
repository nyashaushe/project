
import axios from 'axios';
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
});

// Zod schema for Strapi data transformation
const strapiDataSchema = z.object({
  id: z.number(),
  attributes: z.object({}).passthrough(),
});

const strapiCollectionSchema = z.array(strapiDataSchema);

// Generic function to fetch a collection of items
export async function fetchCollection<T>(
  endpoint: string,
  params?: Record<string, {}>
): Promise<{ data: T[]; meta: {} }> {
  const response = await api.get(`/${endpoint}`, { params: { ...params, pagination: { pageSize: 10 } } });
  const parsedData = strapiCollectionSchema.parse(response.data.data);
  const data = parsedData.map((item) => ({ id: item.id, ...item.attributes })) as T[];
  return { data, meta: response.data.meta };
}

// Generic function to fetch a single item by ID
export async function fetchSingleton<T>(endpoint: string): Promise<T> {
  const response = await api.get(`/${endpoint}`);
  const parsedData = strapiDataSchema.parse(response.data.data);
  return { id: parsedData.id, ...parsedData.attributes } as T;
}

// Generic function to create a new item
export async function createItem<T>(endpoint: string, data: Partial<T>): Promise<T> {
  const response = await api.post(`/${endpoint}`, { data });
  const parsedData = strapiDataSchema.parse(response.data.data);
  return { id: parsedData.id, ...parsedData.attributes } as T;
}

// Generic function to update an existing item
export async function updateItem<T>(endpoint: string, id: number, data: Partial<T>): Promise<T> {
  const response = await api.put(`/${endpoint}/${id}`, { data });
  const parsedData = strapiDataSchema.parse(response.data.data);
  return { id: parsedData.id, ...parsedData.attributes } as T;
}

// Generic function to delete an item by ID
export async function deleteItem(endpoint: string, id: number): Promise<void> {
  await api.delete(`/${endpoint}/${id}`);
}
