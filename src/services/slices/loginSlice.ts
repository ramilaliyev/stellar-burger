import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TLoginSlice = {
    isAuthenticated: boolean,
    accessToken: string | null,
    refreshToken: string | null,
    error: string,
    isLoading: boolean,
}

export const initialState : TLoginSlice = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    error: '',
    isLoading: false,
};

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAuthenticated: (state, action : PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;            
        },
        setAccessToken: (state, action : PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action : PayloadAction<string | null>) => {
            state.refreshToken = action.payload;
        },
        setError: (state, action : PayloadAction<string>) => {
            state.error = action.payload;
        },
        setIsLoading: (state, action : PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearAuthData: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = '';
            state.isLoading = false;
        },
    },
});

export const {
    setAuthenticated,
    setAccessToken,
    setRefreshToken,
    setError,
    setIsLoading,
    clearAuthData,
} = authSlice.actions;

export default authSlice.reducer;
