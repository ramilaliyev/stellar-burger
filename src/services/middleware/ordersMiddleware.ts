// ordersMiddleware.ts
import { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import {
  ordersConnectionStart,
  ordersConnectionSuccess,
  ordersConnectionError,
  ordersConnectionClosed,
  ordersGetMessage,
} from '../actions/orderActions';

const accessToken = localStorage.getItem("accessToken");
let token = accessToken?.replace("Bearer ", "");

const WEBSOCKET_URL = `wss://norma.nomoreparties.space/orders?token=${token}`;

export const ordersMiddleware: Middleware = ((store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | null = null;
  let reconnectInterval: NodeJS.Timeout | null = null;

  const connectWebSocket = () => {
    if (socket) {
      socket.close();
    }

    socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      store.dispatch(ordersConnectionSuccess());
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
      }
    };

    socket.onmessage = (event) => {
      store.dispatch(ordersGetMessage(event.data));
      
    };

    socket.onerror = (event) => {
      store.dispatch(ordersConnectionError("WebSocket error"));
    };

    socket.onclose = () => {
      store.dispatch(ordersConnectionClosed());
      if (!reconnectInterval) {
        reconnectInterval = setInterval(connectWebSocket, 5000);
      }
    };
  };

  return (next) => (action) => {
    if (ordersConnectionStart.match(action)) {
      connectWebSocket();
    }

    next(action);
  };
}) as Middleware;
