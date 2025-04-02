// feedMiddleware.ts
import { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import {
  feedConnectionStart,
  feedConnectionSuccess,
  feedConnectionError,
  feedConnectionClosed,
  feedGetMessage,
} from '../actions/feedActions';

const WEBSOCKET_URL = "wss://norma.nomoreparties.space/orders/all";

export const feedMiddleware: Middleware = ((store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | null = null;
  let reconnectInterval: NodeJS.Timeout | null = null;

  const connectWebSocket = () => {
    if (socket) {
      socket.close();
    }

    socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      store.dispatch(feedConnectionSuccess());
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
      }
    };

    socket.onmessage = (event) => {
      store.dispatch(feedGetMessage(event.data));
    };

    socket.onerror = (event) => {
      store.dispatch(feedConnectionError("WebSocket error"));
    };

    socket.onclose = () => {
      store.dispatch(feedConnectionClosed());
      if (!reconnectInterval) {
        reconnectInterval = setInterval(connectWebSocket, 5000);
      }
    };
  };

  return (next) => (action) => {
    if (feedConnectionStart.match(action)) {
      connectWebSocket();
    }

    next(action);
  };
}) as Middleware;
