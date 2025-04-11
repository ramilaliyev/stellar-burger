import feedReducer, {
  feedConnectionStart,
  feedConnectionSuccess,
  feedConnectionError,
  feedConnectionClosed,
  feedGetMessage,
  initialState,
} from '../services/slices/feedSlice';

import { it, describe, expect } from 'vitest';

describe('feedSlice reducer', () => {
  const getFreshState = () => structuredClone(initialState);

  it('Should return the initial state by default', () => {
    const state = feedReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Should handle feedConnectionStart', () => {
    const payload = { endpoint: "/orders/all" };
    const state = feedReducer(getFreshState(), feedConnectionStart(payload));
    expect(state.isConnected).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Should handle feedConnectionSuccess', () => {
    const state = feedReducer(getFreshState(), feedConnectionSuccess());
    expect(state.isConnected).toBe(true);
  });

  it('Should handle feedConnectionError', () => {
    const state = feedReducer(getFreshState(), feedConnectionError('Ошибка подключения'));
    expect(state.isConnected).toBe(false);
    expect(state.error).toBe('Ошибка подключения');
  });

  it('Should handle feedConnectionClosed', () => {
    const modifiedState = { ...getFreshState(), isConnected: true };
    const state = feedReducer(modifiedState, feedConnectionClosed());
    expect(state.isConnected).toBe(false);
  });

  it('Should handle feedGetMessage', () => {
    const state = feedReducer(getFreshState(), feedGetMessage('Новый заказ'));
    expect(state.message).toBe('Новый заказ');
  });
});