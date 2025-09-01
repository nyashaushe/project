import { prisma } from '../../lib/prisma';

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
  category?: string;
  tags?: string[];
  github?: string;
  live?: string;
}

export const fetchPortfolioItems = async (params?: Record<string, any>): Promise<{ data: PortfolioItem[] }> => {
  try {
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
      take: params?.limit || 10,
      skip: params?.offset || 0,
    });

    return {
      data: portfolioItems.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image || undefined,
        link: item.link || undefined,
        category: item.category || undefined,
        tags: item.tags,
        github: item.github || undefined,
        live: item.live || undefined,
      }))
    };
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    throw new Error('Failed to fetch portfolio items');
  }
};

export const fetchPortfolioItem = async (id: number): Promise<{ data: PortfolioItem }> => {
  try {
    const item = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!item) {
      throw new Error('Portfolio item not found');
    }

    return {
      data: {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image || undefined,
        link: item.link || undefined,
        category: item.category || undefined,
        tags: item.tags,
        github: item.github || undefined,
        live: item.live || undefined,
      }
    };
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    throw new Error('Failed to fetch portfolio item');
  }
};

export const createPortfolioItem = async (itemData: Omit<PortfolioItem, 'id'>): Promise<PortfolioItem> => {
  try {
    const item = await prisma.portfolio.create({
      data: itemData,
    });

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image || undefined,
      link: item.link || undefined,
      category: item.category || undefined,
      tags: item.tags,
      github: item.github || undefined,
      live: item.live || undefined,
    };
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    throw new Error('Failed to create portfolio item');
  }
};