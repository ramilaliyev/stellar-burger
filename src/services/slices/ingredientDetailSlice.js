import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getIngredientDetails = createAsyncThunk (
    "ingredientsDetail/getIngredientDetails",
    async({ URL, id }, { rejectWithValue }) => {
        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }

            const data = await res.json();

            return data.data.find(ingredient => ingredient._id === id);

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState: {
        details: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getIngredientDetails.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getIngredientDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.details = action.payload;
        })
        .addCase(getIngredientDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ingredientDetailsSlice.reducer;