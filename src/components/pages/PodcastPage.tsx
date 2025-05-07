import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Clock, Filter, Search, Mic, Video } from 'lucide-react';

// Mock data for podcast episodes
const MOCK_PODCASTS = [
  {
    id: 1,
    title: 'The Future of Web Development',
    description: 'In this episode, we discuss emerging trends in web development and what skills will be most valuable in the coming years.',
    host: 'Sarah Johnson',
    guest: 'Michael Chen, CTO at TechForward',
    date: 'June 15, 2023',
    duration: '45:22',
    category: 'Technology',
    type: 'audio',
    audioUrl: 'https://example.com/podcast1.mp3',
    imageUrl: 'https://via.placeholder.com/800x450'
  },
  {
    id: 2,
    title: 'Building Scalable Backend Systems',
    description: 'Learn about architecture patterns and best practices for building backend systems that can scale to millions of users.',
    host: 'David Wilson',
    guest: 'Emily Rodriguez, Lead Engineer at ScaleUp',
    date: 'May 22, 2023',
    duration: '52:10',
    category: 'Development',
    type: 'video',
    audioUrl: 'https://example.com/podcast2.mp3',
    videoUrl: 'https://example.com/podcast2.mp4',
    imageUrl: 'https://via.placeholder.com/800x450'
  },
  {
    id: 3,
    title: 'AI in Modern Business Applications',
    description: 'Exploring how artificial intelligence is transforming business operations and decision making processes.',
    host: 'Sarah Johnson',
    guest: 'Dr. James Lee, AI Researcher',
    date: 'April 10, 2023',
    duration: '38:45',
    category: 'Technology',
    type: 'audio',
    audioUrl: 'https://example.com/podcast3.mp3',
    imageUrl: 'https://via.placeholder.com/800x450'
  },
];

// Mock categories
const CATEGORIES = ['All', 'Technology', 'Development', 'Business', 'Design'];

interface PodcastEpisodeProps {
  episode: typeof MOCK_PODCASTS[0];
  onPlay: (episode: typeof MOCK_PODCASTS[0]) => void;
  isPlaying: boolean;
  isActive: boolean;
}

const PodcastEpisode: React.FC<PodcastEpisodeProps> = ({ episode, onPlay, isPlaying, isActive }) => {
  return (
    <motion.div 
      className={`bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isActive ? 'border border-purple-500 shadow-purple-500/20' : 'hover:shadow-purple-500/10'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/3">
          <img 
            src={episode.imageUrl} 
            alt={episode.title} 
            className="w-full h-48 md:h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            {episode.type === 'audio' ? <Mic size={12} className="mr-1" /> : <Video size={12} className="mr-1" />}
            {episode.type.charAt(0).toUpperCase() + episode.type.slice(1)}
          </div>
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
              {episode.title}
            </h3>
            <motion.button 
              className={`p-3 rounded-full ${isActive && isPlaying ? 'bg-purple-600' : 'bg-gray-800'} text-white`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPlay(episode)}
            >
              {isActive && isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </motion.button>
          </div>
          <p className="text-gray-400 text-sm mb-4">{episode.description}</p>
          <div className="flex flex-wrap gap-4 text-gray-500 text-xs mb-4">
            <div className="flex items-center">
              <Mic size={14} className="mr-1" />
              <span>{episode.host}</span>
            </div>
            {episode.guest && (
              <div className="flex items-center">
                <span>Guest: {episode.guest}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{episode.duration}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
              {episode.category}
            </span>
            <motion.button 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AudioPlayer: React.FC<{ currentEpisode: typeof MOCK_PODCASTS[0] | null; isPlaying: boolean; togglePlayPause: () => void }> = ({ 
  currentEpisode, 
  isPlaying, 
  togglePlayPause 
}) => {
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  
  if (!currentEpisode) return null;
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <img 
            src={currentEpisode.imageUrl} 
            alt={currentEpisode.title} 
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <h4 className="text-white font-medium text-sm">{currentEpisode.title}</h4>
            <p className="text-gray-400 text-xs">{currentEpisode.host}</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-xl">
          <div className="flex items-center justify-center space-x-4">
            <motion.button 
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipBack size={20} />
            </motion.button>
            <motion.button 
              className="p-3 rounded-full bg-purple-600 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <motion.button 
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward size={20} />
            </motion.button>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-400 text-xs">0:00</span>
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs">{currentEpisode.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Volume2 size={16} className="text-gray-400" />
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-20 accent-purple-600"
            />
          </div>
          <motion.button 
            className="text-gray-400 hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Download size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const PodcastPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentEpisode, setCurrentEpisode] = useState<typeof MOCK_PODCASTS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filter episodes based on search term and category
  const filteredEpisodes = MOCK_PODCASTS.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayEpisode = (episode: typeof MOCK_PODCASTS[0]) => {
    if (currentEpisode && currentEpisode.id === episode.id) {
      // Toggle play/pause for current episode
      setIsPlaying(!isPlaying);
    } else {
      // Play new episode
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="py-24 pb-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent opacity-30" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full filter blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05, color: "#A78BFA" }}
          >
            Our Podcasts
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Listen to our latest episodes on technology, development, and business insights
          </motion.p>
        </motion.div>

        {/* Search and filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <motion.div 
              className="relative w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search episodes..."
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Filter size={18} className="text-gray-500 mr-2" />
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Podcast episodes list */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <PodcastEpisode 
                key={episode.id} 
                episode={episode} 
                onPlay={handlePlayEpisode}
                isPlaying={isPlaying}
                isActive={currentEpisode?.id === episode.id}
              />
            ))
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">No podcast episodes found matching your criteria.</p>
            </motion.div>
          )}
        </motion.div>

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

      {/* Audio player */}
      {currentEpisode && (
        <AudioPlayer 
          currentEpisode={currentEpisode} 
          isPlaying={isPlaying} 
          togglePlayPause={togglePlayPause} 
        />
      )}

      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentEpisode?.audioUrl} 
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
    </section>
  );
};

export default PodcastPage;