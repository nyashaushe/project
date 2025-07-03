import { fetchCollection, fetchSingleton, createItem } from './apiService';

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

export const fetchArticles = (params?: Record<string, {}>) => fetchCollection<Article>('articles', params);
export const fetchArticle = (id: number) => fetchSingleton<Article>(`articles/${id}`);
export const createArticle = (articleData: Omit<Article, 'id' | 'publishedAt'>) => createItem<Article>('articles', articleData);