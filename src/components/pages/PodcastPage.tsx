'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEpisode, togglePlayPause } from '../../features/audioPlayerSlice';
import { RootState } from '../../store';
import { likePodcast } from '../../services/api/podcast';
import { fetchComments, createComment, likeComment, Comment } from '../../services/api/comment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useToast } from '../../contexts/ToastContext';
import { fetchPodcasts, Podcast } from '@/services/api/podcast'; // Import Strapi podcast service
import Skeleton from '../ui/Skeleton';

// Mock categories (can be fetched from Strapi if you have a categories collection)
const CATEGORIES = ['All', 'Technology', 'Development', 'Business', 'Design'];

const CommentSection = dynamic(() => import('../ui/CommentSection'), { ssr: false });
const LikeButton = dynamic(() => import('../ui/LikeButton'), { ssr: false });
const ShareButtons = dynamic(() => import('../ui/ShareButtons'), { ssr: false });

interface PodcastEpisodeProps {
  episode: Podcast;
  onPlay: (episode: Podcast) => void;
  isPlaying: boolean;
  isActive: boolean;
}

const PodcastEpisode: React.FC<PodcastEpisodeProps> = ({ episode, onPlay, isPlaying, isActive }) => {
  const [likes, setLikes] = useState(episode.likes || 0);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments(episode.id).then(setComments);
  }, [episode.id]);

  const handleLike = async () => {
    try {
      const updatedPodcast = await likePodcast(episode.id);
      setLikes(updatedPodcast.likes);
    } catch (error) {
      console.error('Failed to like podcast:', error);
    }
  };

  const handleAddComment = async (content: string) => {
    try {
      const newComment = await createComment({
        content,
        author: 'Anonymous', // Or replace with actual user data
        podcast: episode.id,
      });
      setComments([...comments, newComment]);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      const updatedComment = await likeComment(commentId);
      setComments(
        comments.map((c) => (c.id === commentId ? updatedComment : c))
      );
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  const { showToast } = useToast();

  const handleShare = () => {
    showToast('Link copied to clipboard!', 'success');
  };

  return (
    <motion.div
      className={`bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isActive ? 'border border-purple-500 shadow-purple-500/20' : 'hover:shadow-purple-500/10'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        {episode?.imageUrl && ( // Assuming imageUrl is available from Strapi
          (<Image
            src={episode.imageUrl}
            alt={episode.title}
            width={768}
            height={192}
            className="w-full h-48 object-cover"
            style={{ objectFit: 'cover' }}
          />)
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-semibold mb-1">{episode?.title}</h3>
          <p className="text-gray-300 text-sm">{episode?.duration}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-300 text-sm mb-4">{episode?.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onPlay(episode)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isPlaying && isActive ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isPlaying && isActive ? 'Pause' : 'Play'}</span>
            </button>
            
            <LikeButton
              likes={likes}
              onToggle={handleLike}
            />
          </div>
          
          <ShareButtons
            url={`/podcast/${episode?.id}`}
            title={episode?.title}
            description={episode?.description}
            onShare={handleShare}
          />
        </div>
      </div>
      {/* Comments Section */}
      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <h4 className="text-white font-medium">Comments</h4>
        </div>
        <CommentSection
          episodeId={episode.id}
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      </div>
      <div className="mt-4">
        <Link
          href={`/podcast/${episode?.id}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors"
          >
          <span>View full episode</span>
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const PodcastPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentEpisode, isPlaying } = useSelector((state: RootState) => state.audioPlayer);
  const [episodes, setEpisodes] = useState<Podcast[]>([]);
  const [meta, setMeta] = useState<{}>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPodcastsData = async () => {
      try {
        setLoading(true);
        const params: {} = {
          pagination: { page, pageSize: 10 },
          sort: 'publishedAt:desc',
        };
        if (selectedCategory !== 'All') {
          params.filters = {
            ...params.filters,
            category: { $eqi: selectedCategory },
          };
        }
        const { data, meta } = await fetchPodcasts(params);
        setEpisodes(page === 1 ? data : [...episodes, ...data]);
        setMeta(meta);
        if (page === 1 && data.length > 0) {
          setCurrentEpisode(data[0]); // Set the first episode as featured by default
        }
      } catch (err) {
        setError('Failed to load podcasts.');
        console.error('Error loading podcasts:', err);
      } finally {
        setLoading(false);
      }
    };
    getPodcastsData();
  }, [selectedCategory, page]);

  const loadMore = () => {
    if (meta && meta.pagination.page < meta.pagination.pageCount) {
      setPage(page + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden">
                <Skeleton className="h-48" />
                <div className="p-6">
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Tech Podcast
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Listen to our latest episodes about technology, development, and design.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" className="group">
                Latest Episodes
                <Play className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost">
                Subscribe on Spotify
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Episode */}
      {currentEpisode && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-full">
                  {currentEpisode?.imageUrl && (
                    <Image
                      src={currentEpisode.imageUrl}
                      alt={currentEpisode.title}
                      width={768}
                      height={256}
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="p-8">
                  {currentEpisode?.category && (
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
                      {currentEpisode.category}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentEpisode?.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {currentEpisode?.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                    <span>{new Date(currentEpisode.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{currentEpisode?.duration}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      title="Play or pause episode"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <button
                      onClick={skipBackward}
                      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                      title="Skip backward"
                    >
                      <SkipBack className="h-6 w-6" />
                    </button>
                    <button
                      onClick={skipForward}
                      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                      title="Skip forward"
                    >
                      <SkipForward className="h-6 w-6" />
                    </button>
                    <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors" title="Volume">
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Episodes List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">All Episodes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse through our collection of podcast episodes
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Episodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode) => (
              <PodcastEpisode
                key={episode.id}
                episode={episode}
                onPlay={(ep) => setCurrentEpisode(ep)}
                isPlaying={isPlaying}
                isActive={currentEpisode?.id === episode.id}
              />
            ))}
          </div>

          {/* Load More Button */}
          {meta && meta.pagination.page < meta.pagination.pageCount && (
            <div className="text-center mt-12">
              <Button variant="ghost" className="group" onClick={loadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More Episodes'}
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Subscription CTA */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-8 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Podcast</h3>
            <p className="text-gray-300">Never miss an episode. Get notified when new content is available.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#7C3AED" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"></path>
              </svg>
              Apple Podcasts
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Spotify
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Google Podcasts
            </motion.button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default PodcastPage;
