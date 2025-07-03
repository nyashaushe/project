import { useState } from 'react';

// Basic template for useLikes hook
export function useLikes() {
  const [likes, setLikes] = useState(0);
  const addLike = () => setLikes(likes + 1);
  return { likes, addLike };
}
