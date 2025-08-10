import { useState } from 'react';
import { likeComment } from '../services/api/comment';

// useLikes hook for persistent likes
export function useLikes(initialLikes: number, commentId: number) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addLike = async () => {
    setIsLiking(true);
    setError(null);
    try {
      const updated = await likeComment(commentId);
      setLikes(updated.likes);
    } catch (err: unknown) {
      // Handle error and expose to consumer
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLiking(false);
    }
  };

  return { likes, addLike, isLiking, error };
}
