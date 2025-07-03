import { useState } from 'react';

// Basic template for useComments hook
export function useComments() {
  const [comments, setComments] = useState<string[]>([]);
  const addComment = (comment: string) => setComments([...comments, comment]);
  return { comments, addComment };
}
