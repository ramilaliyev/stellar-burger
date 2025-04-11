import { describe, it, expect } from 'vitest';
import orderComponentsReducer, { initialState, getOrderComponents } from '../services/slices/orderComponentsSlice';
import { TIngredient } from '../types/types';

describe('ingredientSlice reducer', () => {
  const getFreshState = () => structuredClone(initialState);

  it('Should return the initial state by default', () => {
    const state = orderComponentsReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Should handle getOrderComponents.pending', () => {
    const state = orderComponentsReducer(getFreshState(), { 
      type: getOrderComponents.pending.type 
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Should handle getOrderComponents.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      { _id: '1', name: 'Булка', type: 'bun', proteins: 10, fat: 5, carbohydrates: 20, calories: 100, price: 50, image: '', image_mobile: '', image_large: '' },
      { _id: '2', name: 'Котлета', type: 'main', proteins: 20, fat: 15, carbohydrates: 10, calories: 200, price: 100, image: '', image_mobile: '', image_large: '' },
    ];

    const state = orderComponentsReducer(getFreshState(), {
      type: getOrderComponents.fulfilled.type,
      payload: mockIngredients,
    });

    expect(state.loading).toBe(false);
    expect(state.components).toEqual(mockIngredients);
  });

  it('Should handle getOrderComponents.rejected', () => {
    const mockError = 'Ошибка сети';
    
    const state = orderComponentsReducer(getFreshState(), {
      type: getOrderComponents.rejected.type,
      payload: mockError,
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
