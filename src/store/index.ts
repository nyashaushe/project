import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
import counterReducer from '../features/counterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add your reducers here
      counter: counterReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];