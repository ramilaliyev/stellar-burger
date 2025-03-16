import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { setAuthenticated, setAccessToken } from "../slices/authSlice";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            const data = await api.login(email, password);
            if (data.success) {
                localStorage.setItem("accessToken", data["accessToken"]);
                localStorage.setItem("refreshToken", data["refreshToken"]);

                dispatch(setAccessToken(data["accessToken"]));
                dispatch(setAuthenticated(true));

                return { success: true, fromPage: "/" }; // Можно добавить редирект
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue("Ошибка входа");
        }
    }
);
