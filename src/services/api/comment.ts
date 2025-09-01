import { prisma } from '../../lib/prisma';

export interface Comment {
  id: number;
  content: string;
  author: string;
  email?: string;
  podcastId?: number;
  blogId?: number;
  createdAt: string;
  // Legacy fields for compatibility with existing components
  podcast: number;
  likes: number;
}

export const fetchComments = async (podcastId?: number, blogId?: number): Promise<{ data: Comment[] }> => {
  try {
    const whereClause: any = {};
    if (podcastId) whereClause.podcastId = podcastId;
    if (blogId) whereClause.blogId = blogId;

    const comments = await prisma.comment.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: comment.author,
        email: comment.email || undefined,
        podcastId: comment.podcastId || undefined,
        blogId: comment.blogId || undefined,
        createdAt: comment.createdAt.toISOString(),
        podcast: comment.podcastId || 0, // Legacy field for compatibility
        likes: 0, // Legacy field for compatibility
      })),
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments');
  }
};

export const createComment = async (commentData: Omit<Comment, 'id' | 'createdAt' | 'podcast' | 'likes'>): Promise<Comment> => {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: commentData.content,
        author: commentData.author,
        email: commentData.email,
        podcastId: commentData.podcastId,
        blogId: commentData.blogId,
      },
    });

    return {
      id: comment.id,
      content: comment.content,
      author: comment.author,
      email: comment.email || undefined,
      podcastId: comment.podcastId || undefined,
      blogId: comment.blogId || undefined,
      createdAt: comment.createdAt.toISOString(),
      podcast: comment.podcastId || 0, // Legacy field for compatibility
      likes: 0, // Legacy field for compatibility
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('Failed to create comment');
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await prisma.comment.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment');
  }
};

export const likeComment = async (id: number): Promise<Comment> => {
  try {
    // Since we don't have a likes field in comments, we'll just return the comment
    // You can extend the schema later to add likes functionality
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    return {
      id: comment.id,
      content: comment.content,
      author: comment.author,
      email: comment.email || undefined,
      podcastId: comment.podcastId || undefined,
      blogId: comment.blogId || undefined,
      createdAt: comment.createdAt.toISOString(),
      podcast: comment.podcastId || 0, // Legacy field for compatibility
      likes: 1, // Mock increment for compatibility
    };
  } catch (error) {
    console.error('Error liking comment:', error);
    throw new Error('Failed to like comment');
  }
};