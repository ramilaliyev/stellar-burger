import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Подключаем rootReducer, который уже комбинирует все слайсы
import { socketMiddleware } from './middleware/socketMiddleware'; // Подключаем универсальный WebSocket middleware

// Экшены для feed и orders
import { 
  feedConnectionStart, 
  feedConnectionSuccess, 
  feedConnectionError, 
  feedConnectionClosed, 
  feedGetMessage 
} from './slices/feedSlice';

import { 
  ordersConnectionStart, 
  ordersConnectionSuccess, 
  ordersConnectionError, 
  ordersConnectionClosed, 
  ordersGetMessage 
} from './slices/ordersSlice';

// Экшены для feed
const feedWsActions = {
  connectionStart: feedConnectionStart.type,
  connectionSuccess: feedConnectionSuccess.type,
  connectionError: feedConnectionError.type,
  connectionClosed: feedConnectionClosed.type,
  getMessage: feedGetMessage.type,
};

// Экшены для orders
const ordersWsActions = {
  connectionStart: ordersConnectionStart.type,
  connectionSuccess: ordersConnectionSuccess.type,
  connectionError: ordersConnectionError.type,
  connectionClosed: ordersConnectionClosed.type,
  getMessage: ordersGetMessage.type,
};

// Конфигурация store
const store = configureStore({
  reducer: rootReducer, // Ваш комбинированный редюсер
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      socketMiddleware(feedWsActions), // Подключаем middleware для feed
      socketMiddleware(ordersWsActions) // Подключаем middleware для orders
    ),
  devTools: process.env.NODE_ENV !== 'production', // Включаем devTools в режиме разработки
});

// Типизация для dispatch и состояния
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
