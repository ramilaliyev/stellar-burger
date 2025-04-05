import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { clearConstructor } from "./burgerConstructorSlice";

type TParams = {
    URL : string;
    ingredients: Array<string>
};

type TOrderDetailsSlice = {
    orderNum: string | null,
    loading: boolean,
    error: string | null
}

const initialState : TOrderDetailsSlice  = {
    orderNum: null,
    loading: false,
    error: null
}

export const setOrderDetails = createAsyncThunk(
    "orderDetails/setOrderDetails",
    async({URL, ingredients} : TParams, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    ingredients: ingredients,
                }),
            });

            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            };

            const data = await res.json();      

            dispatch(clearConstructor());

            return data.order.number;

        } catch (error : any) {
            return rejectWithValue(error);
        }
    }
)

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(setOrderDetails.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(setOrderDetails.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.orderNum = action.payload;
        })
        .addCase(setOrderDetails.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default orderDetailsSlice.reducer;