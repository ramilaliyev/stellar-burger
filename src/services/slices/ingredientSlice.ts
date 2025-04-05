import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../types/types";

type TIngredientSlice = {
    ingredients: TIngredient[] | [],
    loading: boolean,
    error: string | null
};

const initialState : TIngredientSlice = {
    ingredients: [],
    loading: false,
    error: null
};

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async(URL : string , { rejectWithValue }) => {
        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }

            const data = await res.json();
            return data.data
        } catch (error : any) {
            return rejectWithValue(error.message);
        }
    }
);

const ingredientSlice = createSlice({
    name: "ingredients",
    reducers: {},
    initialState,
    extraReducers: builder => {
        builder
        .addCase(getIngredients.pending, state => {
            state.loading = true;
            state.error = null;
            
        })
        .addCase(getIngredients.fulfilled, (state, action : PayloadAction<TIngredient[] | []>) => {
            state.loading = false;
            state.ingredients = action.payload;
        })
        .addCase(getIngredients.rejected, (state, action : PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ingredientSlice.reducer;