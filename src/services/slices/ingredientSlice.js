import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async(URL, { rejectWithValue }) => {
        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }

            const data = await res.json();
            return data.data
        } catch {
            return rejectWithValue(error.message);
        }
    }
);

const ingredientSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getIngredients.pending, state => {
            state.loading = true;
            state.error = null;
            
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredients = action.payload;
        })
        .addCase(getIngredients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ingredientSlice.reducer;