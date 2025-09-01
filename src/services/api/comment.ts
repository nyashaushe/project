
// Comments now use Next.js API routes instead of Strapi

export interface Comment {
  id: number;
  content: string;
  author: string;
  podcast: number;
  likes: number;
}

export const fetchComments = async (podcastId: number): Promise<{ data: Comment[] }> => {
  // For now, return empty array since API routes aren't implemented yet
  return { data: [] };
};

export const createComment = async (commentData: Omit<Comment, 'id' | 'likes'>): Promise<Comment> => {
  // For now, return a mock comment since API routes aren't implemented yet
  return {
    id: Date.now(),
    ...commentData,
    likes: 0,
  };
};

export const likeComment = async (id: number): Promise<Comment> => {
  // For now, return a mock comment since API routes aren't implemented yet
  return {
    id,
    content: 'Mock comment',
    author: 'Mock author',
    podcast: 1,
    likes: 1,
  };
};
