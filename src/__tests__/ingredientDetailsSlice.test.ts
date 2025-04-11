import { describe, it, expect } from 'vitest';
import ingredientDetailsReducer, { initialState, getIngredientDetails } from '../services/slices/ingredientDetailSlice';
import { TIngredient } from '../types/types';

describe('Ingredient details reducer', () => { 
    const getFreshState = () => structuredClone(initialState);

    it('Should return the initial state by default', () => {
        const state = ingredientDetailsReducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
    });

    it('Should handle getIngredients.pending', () => {
        const state = ingredientDetailsReducer(getFreshState(), { type: getIngredientDetails.pending.type });
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('Should handle getIngredients.fulfilled', () => {
        const mockIngredients: TIngredient[] = [
            { _id: '1', name: 'Булка', type: 'bun', proteins: 10, fat: 5, carbohydrates: 20, calories: 100, price: 50, image: '', image_mobile: '', image_large: '' },
            { _id: '2', name: 'Котлета', type: 'main', proteins: 20, fat: 15, carbohydrates: 10, calories: 200, price: 100, image: '', image_mobile: '', image_large: '' },
        ];

        const state = ingredientDetailsReducer(getFreshState(), {
            type: getIngredientDetails.fulfilled.type,
            payload: mockIngredients,
        });

        expect(state.loading).toBe(false);
        expect(state.details).toEqual(mockIngredients);
    });

    it('Should handle getIngredients.rejected', () => {
        const mockError = 'Ошибка сети';
        
        const state = ingredientDetailsReducer(getFreshState(), {
            type: getIngredientDetails.rejected.type,
            payload: mockError,
        });

        expect(state.loading).toBe(false);
        expect(state.error).toBe(mockError);
    });
})