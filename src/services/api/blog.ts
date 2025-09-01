import { prisma } from '../../lib/prisma';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

export const fetchBlogPosts = async (params?: Record<string, any>): Promise<{ data: BlogPost[]; meta: any }> => {
  try {
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.blog.count(),
    ]);

    return {
      data: blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        author: blog.author,
        categories: blog.categories,
        featuredImage: blog.featuredImage || undefined,
        publishedAt: blog.publishedAt.toISOString(),
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
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
};

export const fetchBlogPost = async (id: number): Promise<{ data: BlogPost }> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new Error('Blog post not found');
    }

    return {
      data: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        author: blog.author,
        categories: blog.categories,
        featuredImage: blog.featuredImage || undefined,
        publishedAt: blog.publishedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw new Error('Failed to fetch blog post');
  }
};

export const createBlog = async (blogData: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> => {
  try {
    const blog = await prisma.blog.create({
      data: {
        ...blogData,
        publishedAt: new Date(),
      },
    });

    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      categories: blog.categories,
      featuredImage: blog.featuredImage || undefined,
      publishedAt: blog.publishedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw new Error('Failed to create blog post');
  }
};