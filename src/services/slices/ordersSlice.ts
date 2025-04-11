// ordersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrdersState {
  message: string;
  isConnected: boolean;
  error: string | null;
}

interface OrdersConnectionStartPayload {
  endpoint: string;  // Добавляем параметр endpoint
}

export const initialState: OrdersState = {
  message: '',
  isConnected: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersConnectionStart: (state, action: PayloadAction<OrdersConnectionStartPayload>) => {
      state.isConnected = false;
      state.error = null;
    },
    ordersConnectionSuccess: (state) => {
      state.isConnected = true;
    },
    ordersConnectionError: (state, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.error = action.payload;
    },
    ordersConnectionClosed: (state) => {
      state.isConnected = false;
    },
    ordersGetMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const {
  ordersConnectionStart,
  ordersConnectionSuccess,
  ordersConnectionError,
  ordersConnectionClosed,
  ordersGetMessage,
} = ordersSlice.actions;

export default ordersSlice.reducer;
