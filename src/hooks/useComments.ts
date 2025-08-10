import { useState, useEffect } from 'react';
import { fetchComments, createComment } from '../services/api/comment';

export interface Comment {
  id: number;
  content: string;
  author: string;
  podcast: number;
  likes: number;
}

// useComments hook for persistent comments
export function useComments(podcastId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComments(podcastId)
      .then((result) => {
        setComments(result.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load comments');
        setLoading(false);
      });
  }, [podcastId]);

  const addComment = async (content: string, author: string) => {
    setIsSubmitting(true);
    try {
      const newComment = await createComment({ content, author, podcast: podcastId });
      setComments((prev) => [...prev, newComment]);
    } catch {
      setError('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { comments, addComment, loading, error, isSubmitting };
}
