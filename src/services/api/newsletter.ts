// Newsletter now uses Next.js API routes instead of Strapi

export interface Newsletter {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
}

export const fetchNewsletters = async (params?: Record<string, any>): Promise<{ data: Newsletter[] }> => {
  // Mock implementation - replace with actual API call when ready
  return {
    data: [
      {
        id: 1,
        title: 'Welcome to Our Newsletter',
        content: 'This is our first newsletter with exciting updates...',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Monthly Tech Updates',
        content: 'Here are the latest technology trends and updates...',
        publishedAt: new Date().toISOString(),
      }
    ]
  };
};

export const fetchNewsletter = async (id: number): Promise<{ data: Newsletter }> => {
  // Mock implementation - replace with actual API call when ready
  return {
    data: {
      id,
      title: 'Sample Newsletter',
      content: 'This is a sample newsletter content...',
      publishedAt: new Date().toISOString(),
    }
  };
};

export const createNewsletter = async (newsletterData: Omit<Newsletter, 'id' | 'publishedAt'>): Promise<Newsletter> => {
  // Mock implementation - replace with actual API call when ready
  return {
    id: Date.now(),
    ...newsletterData,
    publishedAt: new Date().toISOString(),
  };
};