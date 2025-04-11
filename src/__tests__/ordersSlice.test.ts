import orderReducer, {
    ordersConnectionStart,
    ordersConnectionSuccess,
    ordersConnectionError,
    ordersConnectionClosed,
    ordersGetMessage,
    initialState
} from '../services/slices/ordersSlice';

import { it, describe, expect, beforeAll, vi } from 'vitest';

beforeAll(() => {
  globalThis.localStorage = {
    getItem: vi.fn(() => 'Bearer accessToken'),
  } as unknown as Storage;
});

describe('ordersSlice reducer', () => { 
    const getFreshState = () => structuredClone(initialState);

    it('Should return the initial state by default', () => {
        const state = orderReducer(undefined, {type: ''});
        expect(state).toEqual(initialState);
    });

    it('Should handle ordersConnectionStart', () => {
        const accessToken = localStorage.getItem("accessToken");
        let token = accessToken?.replace("Bearer ", "");

        const payload = { endpoint: `/orders?token=${token}` };
        const state = orderReducer(getFreshState(), ordersConnectionStart(payload));
        expect(state.isConnected).toBe(false);
        expect(state.error).toBeNull();
    });
    
    it('Should handle ordersConnectionSuccess', () => {
        const state = orderReducer(getFreshState(), ordersConnectionSuccess());
        expect(state.isConnected).toBe(true);
    });

    it('Should handle ordersConnectionError', () => {
        const state = orderReducer(getFreshState(), ordersConnectionError('Ошибка получения заказов'));
        expect(state.isConnected).toBe(false);
        expect(state.error).toBe('Ошибка получения заказов');
    });

    it('Should handle ordersConnectionClosed', () => {
        const state = orderReducer(getFreshState(), ordersConnectionClosed());
        expect(state.isConnected).toBe(false);
    })

    it('Should handle ordersGetMessage', () => {
        const state = orderReducer(getFreshState(), ordersGetMessage('Новый заказ'));
        expect(state.message).toBe('Новый заказ');
    })
});