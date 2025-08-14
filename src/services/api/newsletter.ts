// Newsletter now uses Next.js API routes instead of Strapi

export interface Newsletter {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
}

export const fetchNewsletters = (params?: Record<string, {}>) => fetchCollection<Newsletter>('newsletters', params);
export const fetchNewsletter = (id: number) => fetchSingleton<Newsletter>(`newsletters/${id}`);
export const createNewsletter = (newsletterData: Omit<Newsletter, 'id' | 'publishedAt'>) =>
  createItem<Newsletter>('newsletters', newsletterData);