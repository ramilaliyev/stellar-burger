import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TOrderResponse } from "../../types/types";

type TParams = {
    URL: string;
    id: string;
};

type TOrderComponentsSlice = {
    components: TOrderResponse | null,
    loading: boolean,
    error: string | null
};

const initialState : TOrderComponentsSlice = {
    components: null,
    loading: false,
    error: null
};

export const getOrderComponents = createAsyncThunk (
    "orderComponents/getOrderComponents",
    async({ URL, id } : TParams, { rejectWithValue }) => {
        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }

            const data = await res.json();

            return data.orders.find((order : {_id: string}) => order._id === id);

        } catch (error : any) {
            return rejectWithValue(error.message);
        }
    }
)

const orderComponentsSlice = createSlice({
    name: "orderComponents",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getOrderComponents.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrderComponents.fulfilled, (state, action : PayloadAction<TOrderResponse | null>) => {
            state.loading = false;
            state.components = action.payload;
        })
        .addCase(getOrderComponents.rejected, (state, action : PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default orderComponentsSlice.reducer;
