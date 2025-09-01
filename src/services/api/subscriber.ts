// Subscribers now use Next.js API routes instead of Strapi

export interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export const fetchSubscribers = async (params?: Record<string, any>): Promise<{ data: Subscriber[] }> => {
  // Mock implementation - replace with actual API call when ready
  return {
    data: [
      {
        id: 1,
        email: 'user1@example.com',
        subscribedAt: new Date().toISOString(),
      },
      {
        id: 2,
        email: 'user2@example.com',
        subscribedAt: new Date().toISOString(),
      }
    ]
  };
};

export const subscribe = async (email: string): Promise<Subscriber> => {
  // Mock implementation - replace with actual API call when ready
  return {
    id: Date.now(),
    email,
    subscribedAt: new Date().toISOString(),
  };
};