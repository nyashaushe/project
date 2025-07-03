import { fetchCollection, createItem } from './apiService';

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
  publishedAt: string;
}

export const fetchTestimonials = (params?: Record<string, {}>) => fetchCollection<Testimonial>('testimonials', params);
export const submitTestimonial = (data: Omit<Testimonial, 'id' | 'publishedAt'>) => createItem<Testimonial>('testimonials', data);