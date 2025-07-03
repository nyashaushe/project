import { fetchCollection, createItem } from './apiService';

export interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export const fetchSubscribers = (params?: Record<string, {}>) => fetchCollection<Subscriber>('subscribers', params);
export const subscribe = (email: string) => createItem<Subscriber>('subscribers', { email });