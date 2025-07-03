import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from '../features/audioPlayerSlice';
import authReducer from '../features/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      audioPlayer: audioPlayerReducer,
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];