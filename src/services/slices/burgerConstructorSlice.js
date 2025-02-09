import { createSlice, nanoid } from "@reduxjs/toolkit";

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        bun: null,
        ingredients: []
    },
    reducers: {
        addIngredient: (state, action) => {
            state.ingredients.push({...action.payload, uniqueId: nanoid()});
        },
        removeIngredient: (state, action) => {            
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload);
        },
        clearConstructor: (state) => {
            state.bun = null; 
            state.ingredients = [];
        },
        addBun: (state, action) => {
            state.bun = action.payload;
        },
        moveIngredient: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const ingredients = [...state.ingredients]; 
        
            if (fromIndex === toIndex) return;
        
            const [movedItem] = ingredients.splice(fromIndex, 1);
        
            ingredients.splice(toIndex, 0, movedItem);
        
            console.log(ingredients);
            
            state.ingredients = ingredients;
            console.log(state.ingredients);
        }        
    }
    
})

export const { addIngredient, removeIngredient, clearConstructor, addBun, moveIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;