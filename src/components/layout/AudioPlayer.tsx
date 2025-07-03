
'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import Image from 'next/image';
import { RootState } from '../../store';
import { togglePlayPause, clearCurrentEpisode } from '../../features/audioPlayerSlice';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

const AudioPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentEpisode, isPlaying } = useSelector((state: RootState) => state.audioPlayer);
  const { currentTime, duration, setVolume, skipForward, skipBackward, seek } = useAudioPlayer({
    audioUrl: currentEpisode?.audioUrl || '',
    onEnded: () => {
      dispatch(clearCurrentEpisode());
    },
  });

  if (!currentEpisode) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          {currentEpisode?.imageUrl && (
            <Image
              src={currentEpisode.imageUrl}
              alt={currentEpisode.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded object-cover"
              style={{ objectFit: 'cover' }}
            />
          )}
          <div>
            <h4 className="text-white font-medium text-sm">{currentEpisode?.title}</h4>
            <p className="text-gray-400 text-xs">{currentEpisode?.description}</p>
          </div>
        </div>
        <div className="flex-1 max-w-xl">
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={skipBackward}
            >
              <SkipBack size={20} />
            </motion.button>
            <motion.button
              className="p-3 rounded-full bg-blue-500 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(togglePlayPause())}
              title="Play or pause episode"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <motion.button
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={skipForward}
            >
              <SkipForward size={20} />
            </motion.button>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full accent-blue-500"
              title="Seek"
            />
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 accent-blue-500"
            title="Volume control"
          />
          <motion.button
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(clearCurrentEpisode())}
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
