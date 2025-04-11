import burgerConstructorReducer, {
    addIngredient, 
    removeIngredient, 
    clearConstructor, 
    addBun, 
    moveIngredient,
    initialState
} from '../services/slices/burgerConstructorSlice';

import { it, describe, expect } from 'vitest';

import type { TDraggableIngredient } from '../types/types';

const getMockIngredient = (id = '123', name = 'Сыр'): TDraggableIngredient => ({
  _id: id,
  name,
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: '',
  image_mobile: '',
  image_large: '',
  ingredient: {
    _id: id,
    name,
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: '',
  },
  index: 0,
  moveCard: () => {},
  fromBurgerConstructor: true,
});

const getMockBun = (id = '133', name = 'Булка'): TDraggableIngredient => ({
    _id: id,
    name,
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: '',
    ingredient: {
      _id: id,
      name,
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: '',
      image_mobile: '',
      image_large: '',
    },
    index: 0,
    moveCard: () => {},
    fromBurgerConstructor: true,
  });


describe('Burger constructor slice reducer', () => {
    const getFreshState = () => structuredClone(initialState);

    it('Should return the initial state by default', () => {
        const state = burgerConstructorReducer(undefined, {type: ''});
        expect(state).toEqual(initialState);
    });

    it('Should clear constructor', () => {
        const mockState = {
            bun: getMockBun('1', 'Булка'),
            ingredients: [
                getMockIngredient('2', 'Соус')
            ]
        };

        const state = burgerConstructorReducer(mockState, clearConstructor());
        expect(state).toEqual(initialState);
    });

    it('Should add bun', () => {
        const mockBun = getMockBun('1', 'Булка');

        const state = burgerConstructorReducer(getFreshState(), addBun(getMockBun('1', 'Булка')));
        
        expect(state.bun?._id).toBe(mockBun._id);
        expect(state.bun?.name).toBe(mockBun.name);
        expect(state.ingredients).toEqual([]);
    });

    it('Should add ingredient', () => {
        const mockIngredient = getMockIngredient('2', 'Сыр');

        const state = burgerConstructorReducer(getFreshState(), addIngredient(mockIngredient));
       
        expect(state.bun).toEqual(null);
        expect(state.ingredients[0]?._id).toBe(mockIngredient._id);
        expect(state.ingredients[0]?.name).toBe(mockIngredient.name);
    });

    it('Should remove ingredient', () => {
        const addedIngredient = burgerConstructorReducer(
            getFreshState(),
            addIngredient(getMockIngredient('2', 'Сыр'))
        );
    
        const uniqueIdToRemove = addedIngredient.ingredients[0].uniqueId;
    
        const newState = burgerConstructorReducer(
            addedIngredient,
            removeIngredient(uniqueIdToRemove)
        );
    
        expect(newState.ingredients.length).toBe(0);
        expect(newState.bun).toBeNull();
    });    

    it('Should move ingredient', () => {
        // Создаём два ингредиента с разными ID и uniqueId
        const ingredient1 = {
          ...getMockIngredient('1', 'Салат'),
          uniqueId: 'id-1'
        };
        const ingredient2 = {
          ...getMockIngredient('2', 'Сыр'),
          uniqueId: 'id-2'
        };
      
        // Начальное состояние с двумя ингредиентами
        const mockState = {
          bun: null,
          ingredients: [ingredient1, ingredient2]
        };
      
        // Действие: переместить ингредиент с индекса 0 на индекс 1
        const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      
        // Выполняем редьюсер
        const state = burgerConstructorReducer(mockState, action);
      
        // Проверки
        expect(state.ingredients.length).toBe(2);
        expect(state.ingredients[0].uniqueId).toBe('id-2');
        expect(state.ingredients[1].uniqueId).toBe('id-1');
      });
      
});
