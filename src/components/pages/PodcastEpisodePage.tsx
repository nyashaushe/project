'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const LikeButton = dynamic(() => import('../ui/LikeButton'), { ssr: false });
const ShareButtons = dynamic(() => import('../ui/ShareButtons'), { ssr: false });
const CommentSection = dynamic(() => import('../ui/CommentSection'), { ssr: false });
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useLikes } from '../../hooks/useLikes';
import { useComments } from '../../hooks/useComments';
import { useToast } from '../../contexts/ToastContext';
import Image from 'next/image';
import { fetchPodcast, Podcast } from '@/services/api/podcast';

const PodcastEpisodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    const getEpisode = async () => {
      try {
        setLoading(true);
        const data = await fetchPodcast(Number(id));
        setEpisode(data);
      } catch {
        setError('Failed to load episode');
      } finally {
        setLoading(false);
      }
    };
    getEpisode();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Episode not found'}</h2>
          <a
            href="/podcast"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Podcasts
          </a>
        </div>
      </div>
    );
  }

  const audioPlayer = useAudioPlayer({
    audioUrl: episode.audioUrl,
    onEnded: () => {
      showToast('Episode finished playing', 'info');
    }
  });

  const likesManager = useLikes({
    initialLikes: episode.likes,
    isLiked: episode.isLiked,
    onLikeChange: (isLiked) => {
      showToast(isLiked ? 'Added to likes' : 'Removed from likes', 'success');
    }
  });

  const commentsManager = useComments({
    initialComments: episode.comments,
    onCommentAdd: async () => {
      showToast('Comment added successfully', 'success');
    },
    onCommentLike: async () => {
      showToast('Comment liked', 'success');
    }
  });

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    showToast('Link copied to clipboard!', 'success');
  };

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="relative rounded-lg overflow-hidden mb-8">
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                width={1024} // Adjust based on typical image width
                height={384} // h-96 = 384px
                className="w-full h-96 object-cover"
                style={{ objectFit: 'cover' }} // Ensure object-fit is applied
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold mb-4">{episode.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>{episode.host}</span>
                  <span>•</span>
                  <span>{episode.date}</span>
                  <span>•</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            </div>

            {/* Episode Details */}
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={audioPlayer.togglePlayPause}
                    className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    {audioPlayer.isPlaying ? (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{formatTime(audioPlayer.currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={audioPlayer.duration}
                      value={audioPlayer.currentTime}
                      onChange={(e) => audioPlayer.seek(Number(e.target.value))}
                      className="w-64"
                      aria-label="Seek audio" // Add aria-label for accessibility
                    />
                    <span className="text-sm text-gray-400">{formatTime(audioPlayer.duration)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <LikeButton
                    isLiked={likesManager.isLiked}
                    likes={likesManager.likes}
                    onToggle={likesManager.toggleLike}
                  />
                  <ShareButtons
                    url={window.location.href}
                    title={episode.title}
                    description={episode.description}
                    onShare={handleShare}
                  />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">{episode.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Host</h3>
                    <p className="text-gray-300">{episode.host}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Guest</h3>
                    <p className="text-gray-300">{episode.guest}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                  <span className="px-3 py-1 bg-gray-700 rounded-full">{episode.category}</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full">{episode.type}</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Comments</h2>
              <CommentSection
                episodeId={Number(episode.id)}
                comments={commentsManager.comments}
                onAddComment={commentsManager.addComment}
                onLikeComment={commentsManager.likeComment}
              />
            </div>
          </div>
        </div>
      </motion.div>
  );
};

export default PodcastEpisodePage;
