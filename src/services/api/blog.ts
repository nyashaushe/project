import { fetchCollection, fetchSingleton, createItem } from './apiService';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

export const fetchBlogPosts = (params?: Record<string, {}>) => fetchCollection<BlogPost>('blogs', params);
export const fetchBlogPost = (id: number) => fetchSingleton<BlogPost>(`blogs/${id}`);
export const createBlogPost = (blogPostData: Omit<BlogPost, 'id' | 'publishedAt'>) => createItem<BlogPost>('blogs', blogPostData);