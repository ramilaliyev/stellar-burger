import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../store';
import { TWsActions } from '../../types/types';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let reconnectInterval: NodeJS.Timeout | null = null;

    const connectWebSocket = (endpoint: string) => {
      const baseURL = "wss://norma.nomoreparties.space";  
      const url = `${baseURL}${endpoint}`;

      if (socket) {
        socket.close();
      }

      socket = new WebSocket(url);

      socket.onopen = () => {
        store.dispatch({ type: wsActions.connectionSuccess }); 
        if (reconnectInterval) {
          clearInterval(reconnectInterval);
          reconnectInterval = null;
        }
      };

      socket.onmessage = (event) => {
        store.dispatch({ type: wsActions.getMessage, payload: event.data });  
      };

      socket.onerror = () => {
        store.dispatch({ type: wsActions.connectionError, payload: 'WebSocket error' });  
      };

      socket.onclose = () => {
        store.dispatch({ type: wsActions.connectionClosed });  
        if (!reconnectInterval) {
          reconnectInterval = setInterval(() => connectWebSocket(endpoint), 5000);  
        }
      };
    };

    return (next) => (action: any) => {
      const { type, payload } = action;
      
      if (type === wsActions.connectionStart) {
        
        const endpoint = payload?.endpoint || "/orders/all";
        connectWebSocket(endpoint);  
      }

      return next(action);
    };
  };
};
