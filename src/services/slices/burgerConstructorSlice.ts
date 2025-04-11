import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TDraggableIngredient } from "../../types/types";

type TIngredientWithId = TDraggableIngredient & { uniqueId : string | undefined };

type TBurgerConstructorSlice = {
    bun : TDraggableIngredient | null, 
    ingredients: Array<TDraggableIngredient>
};

type TMove = {
    fromIndex: number,
    toIndex: number
};


export const initialState : TBurgerConstructorSlice = {
    bun: null,
    ingredients: []
};

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action : PayloadAction<TIngredientWithId>) => {
              state.ingredients.push(action.payload);
            },
            prepare: (ingredient: TDraggableIngredient) => {
              const uniqueId = nanoid();
              return { payload: { ...ingredient, uniqueId } };
            },
        },
        removeIngredient: (state, action : PayloadAction<string | undefined>) => {            
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload);
        },
        clearConstructor: (state) => {
            state.bun = null; 
            state.ingredients = [];
        },
        addBun: (state, action : PayloadAction<TDraggableIngredient>) => {
            state.bun = action.payload;
        },
        moveIngredient: (state, action : PayloadAction<TMove>) => {
            const { fromIndex, toIndex } = action.payload;
            const ingredients = [...state.ingredients]; 
        
            if (fromIndex === toIndex) return;
            const [movedItem] = ingredients.splice(fromIndex, 1);
            ingredients.splice(toIndex, 0, movedItem);
        
            state.ingredients = ingredients;
        }        
    }
    
})

export const { addIngredient, removeIngredient, clearConstructor, addBun, moveIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;