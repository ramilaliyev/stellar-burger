import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearConstructor } from "./burgerConstructorSlice";

export const setOrderDetails = createAsyncThunk(
    "orderDetails/setOrderDetails",
    async({URL, ingredients}, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: ingredients,
                }),
            });

            if (!res.ok) {
                console.error('Ошибка от сервера:', res.status);
                throw new Error(`Ошибка: ${res.status}`);
            };

            const data = await res.json();      

            dispatch(clearConstructor());

            return data.order.number;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        orderNum: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(setOrderDetails.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(setOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderNum = action.payload;
        })
        .addCase(setOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default orderDetailsSlice.reducer;