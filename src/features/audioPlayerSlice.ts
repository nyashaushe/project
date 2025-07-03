
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Podcast } from '../services/api/podcast';

interface AudioPlayerState {
  currentEpisode: Podcast | null;
  isPlaying: boolean;
}

const initialState: AudioPlayerState = {
  currentEpisode: null,
  isPlaying: false,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setCurrentEpisode(state, action: PayloadAction<Podcast>) {
      state.currentEpisode = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    clearCurrentEpisode(state) {
      state.currentEpisode = null;
      state.isPlaying = false;
    },
  },
});

export const {
  setCurrentEpisode,
  togglePlayPause,
  clearCurrentEpisode,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
