// feedSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedState {
  message: string;
  isConnected: boolean;
  error: string | null;
}

interface FeedConnectionStartPayload {
  endpoint: string;  // Добавляем параметр endpoint
}

export const initialState: FeedState = {
  message: '',
  isConnected: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedConnectionStart: (state, action: PayloadAction<FeedConnectionStartPayload>) => {
      state.isConnected = false;
      state.error = null;
    },
    feedConnectionSuccess: (state) => {
      state.isConnected = true;
    },
    feedConnectionError: (state, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.error = action.payload;
    },
    feedConnectionClosed: (state) => {
      state.isConnected = false;
    },
    feedGetMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const {
  feedConnectionStart,
  feedConnectionSuccess,
  feedConnectionError,
  feedConnectionClosed,
  feedGetMessage,
} = feedSlice.actions;

export default feedSlice.reducer;
