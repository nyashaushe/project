import { fetchCollection, fetchSingleton, createItem } from './apiService';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: string;
  publishedAt: string;
  imageUrl?: string;
  category?: string;
  likes?: number;
  isLiked?: boolean;
  comments?: any[];
  host?: string;
  date?: string;
  guest?: string;
  type?: string;
}

export const fetchPodcasts = (params?: Record<string, {}>) => fetchCollection<Podcast>('podcasts', params);
export const fetchPodcast = (id: number) => fetchSingleton<Podcast>(`podcasts/${id}`);
export const createPodcast = (podcastData: Omit<Podcast, 'id' | 'publishedAt'>) => createItem<Podcast>('podcasts', podcastData);
export const likePodcast = (id: number) => updateItem<Podcast>('podcasts', id, {});