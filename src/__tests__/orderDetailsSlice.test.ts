import { describe, it, expect } from 'vitest';
import orderDetailsReducer, { initialState, setOrderDetails } from '../services/slices/orderDetailsSlice';

describe('ingredientSlice reducer', () => {
  const getFreshState = () => structuredClone(initialState);

  it('Should return the initial state by default', () => {
    const state = orderDetailsReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Should handle setOrderDetails.pending', () => {
    const state = orderDetailsReducer(getFreshState(), { type: setOrderDetails.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Should handle setOrderDetails.fulfilled', () => {
    const mockIngredient: string = "758552";

    const state = orderDetailsReducer(getFreshState(), {
      type: setOrderDetails.fulfilled.type,
      payload: mockIngredient,
    });

    expect(state.loading).toBe(false);
    expect(state.orderNum).toEqual(mockIngredient);
  });

  it('Should handle setOrderDetails.rejected', () => {
    const mockError = 'Ошибка сети';
    
    const state = orderDetailsReducer(getFreshState(), {
      type: setOrderDetails.rejected.type,
      payload: mockError,
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
