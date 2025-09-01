import { prisma } from '../../lib/prisma';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: string;
  publishedAt: string;
  date?: string; // For compatibility with existing components
  imageUrl?: string;
  category?: string;
  likes: number;
  host?: string;
  guest?: string;
  type?: string;
}

export const fetchPodcasts = async (params?: Record<string, any>): Promise<{ data: Podcast[]; meta: any }> => {
  try {
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    const [podcasts, total] = await Promise.all([
      prisma.podcast.findMany({
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.podcast.count(),
    ]);

    return {
      data: podcasts.map(podcast => ({
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        audioUrl: podcast.audioUrl || undefined,
        videoUrl: podcast.videoUrl || undefined,
        duration: podcast.duration || undefined,
        publishedAt: podcast.publishedAt.toISOString(),
        date: podcast.publishedAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
        imageUrl: podcast.imageUrl || undefined,
        category: podcast.category || undefined,
        likes: podcast.likes,
        host: podcast.host || undefined,
        guest: podcast.guest || undefined,
        type: podcast.type || undefined,
      })),
      meta: {
        pagination: {
          total,
          page: Math.floor(offset / limit) + 1,
          pageSize: limit,
          hasMore: offset + limit < total,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw new Error('Failed to fetch podcasts');
  }
};

export const fetchPodcast = async (id: number): Promise<{ data: Podcast }> => {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: { id },
      include: {
        comments: true,
      },
    });

    if (!podcast) {
      throw new Error('Podcast not found');
    }

    return {
      data: {
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        audioUrl: podcast.audioUrl || undefined,
        videoUrl: podcast.videoUrl || undefined,
        duration: podcast.duration || undefined,
        publishedAt: podcast.publishedAt.toISOString(),
        date: podcast.publishedAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
        imageUrl: podcast.imageUrl || undefined,
        category: podcast.category || undefined,
        likes: podcast.likes,
        host: podcast.host || undefined,
        guest: podcast.guest || undefined,
        type: podcast.type || undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching podcast:', error);
    throw new Error('Failed to fetch podcast');
  }
};

export const createPodcast = async (podcastData: Omit<Podcast, 'id' | 'publishedAt' | 'likes' | 'date'>): Promise<Podcast> => {
  try {
    const podcast = await prisma.podcast.create({
      data: {
        ...podcastData,
        publishedAt: new Date(),
        likes: 0,
      },
    });

    return {
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      audioUrl: podcast.audioUrl || undefined,
      videoUrl: podcast.videoUrl || undefined,
      duration: podcast.duration || undefined,
      publishedAt: podcast.publishedAt.toISOString(),
      date: podcast.publishedAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      imageUrl: podcast.imageUrl || undefined,
      category: podcast.category || undefined,
      likes: podcast.likes,
      host: podcast.host || undefined,
      guest: podcast.guest || undefined,
      type: podcast.type || undefined,
    };
  } catch (error) {
    console.error('Error creating podcast:', error);
    throw new Error('Failed to create podcast');
  }
};

export const likePodcast = async (id: number): Promise<Podcast> => {
  try {
    const podcast = await prisma.podcast.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return {
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      audioUrl: podcast.audioUrl || undefined,
      videoUrl: podcast.videoUrl || undefined,
      duration: podcast.duration || undefined,
      publishedAt: podcast.publishedAt.toISOString(),
      date: podcast.publishedAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      imageUrl: podcast.imageUrl || undefined,
      category: podcast.category || undefined,
      likes: podcast.likes,
      host: podcast.host || undefined,
      guest: podcast.guest || undefined,
      type: podcast.type || undefined,
    };
  } catch (error) {
    console.error('Error liking podcast:', error);
    throw new Error('Failed to like podcast');
  }
};