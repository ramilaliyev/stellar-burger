import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setIsLoading: (state, action) => {
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
