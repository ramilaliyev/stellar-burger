import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../types/types";

type TParams = {
    URL : string;
    id: string;
};

type TIngredientDetailsSlice = {
    details: TIngredient | null,
    loading: boolean,
    error: string | null
};

export const initialState: TIngredientDetailsSlice = {
    details: null,
    loading: false,
    error: null
}

export const getIngredientDetails = createAsyncThunk (
    "ingredientsDetail/getIngredientDetails",
    async({ URL, id } : TParams, { rejectWithValue }) => {
        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }

            const data = await res.json();

            return data.data.find((ingredient : {_id: string}) => ingredient._id === id);

        } catch (error : any) {
            return rejectWithValue(error.message);
        }
    }
)

const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getIngredientDetails.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getIngredientDetails.fulfilled, (state, action : PayloadAction<TIngredient | null>) => {
            state.loading = false;
            state.details = action.payload;
        })
        .addCase(getIngredientDetails.rejected, (state, action : PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ingredientDetailsSlice.reducer;