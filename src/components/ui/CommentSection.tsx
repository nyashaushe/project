import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component
import type { PodcastComment } from '../../hooks/useComments';
import { useToast } from '../../contexts/ToastContext';

interface CommentSectionProps {
  comments: PodcastComment[];
  onAddComment: (content: string, author: string) => Promise<void>;
  onLikeComment: (commentId: number) => Promise<void>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // In a real app, you would get the current user from your auth context
      // const currentUser: User = {
      //   name: 'Current User',
      //   avatar: '/avatars/default.jpg'
      // };

      await onAddComment(newComment.trim(), 'Anonymous User');
      setNewComment('');
      showToast('Comment added successfully', 'success');
    } catch {
      showToast('Failed to add comment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Add a comment form">
        <label htmlFor="new-comment" className="sr-only">Add a comment</label>
        <input
          id="new-comment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isSubmitting}
          aria-label="Comment input"
        />
        <motion.button
          type="submit"
          className="bg-purple-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting || !newComment.trim()}
          aria-label="Post comment"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>Post</span>
        </motion.button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              {comment.user.avatar ? (
                <Image
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  width={32} // Specify width
                  height={32} // Specify height
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  {comment.user.name[0]}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-white font-medium">{comment.user.name}</h5>
                  <span className="text-gray-400 text-sm">{comment.date}</span>
                </div>
                <p className="text-gray-300 mt-1">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <motion.button
                    onClick={() => onLikeComment(comment.id)}
                    className={`flex items-center gap-1 text-sm ${
                      comment.isLiked ? 'text-purple-400' : 'text-gray-400'
                    } hover:text-purple-400 transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Like comment by ${comment.user.name}`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        comment.isLiked ? 'fill-purple-400' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span>{comment.likes}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;