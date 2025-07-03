
import { fetchCollection, createItem, updateItem } from './apiService';

export interface Comment {
  id: number;
  content: string;
  author: string;
  podcast: number;
  likes: number;
}

export const fetchComments = (podcastId: number) => fetchCollection<Comment>('comments', { filters: { podcast: podcastId } });
export const createComment = (commentData: Omit<Comment, 'id' | 'likes'>) => createItem<Comment>('comments', commentData);
export const likeComment = (id: number) => updateItem<Comment>(`comments/${id}/like`, id, {});
