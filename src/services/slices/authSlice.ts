import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TAuthSlice = {
  isAuthChecked: boolean,  
  isAuthenticated: boolean, 
  accessToken: string | null, 
};

export const initialState : TAuthSlice = {
  isAuthChecked: false,  
  isAuthenticated: false, 
  accessToken: localStorage.getItem('accessToken') || null, 
};

// Слайс авторизации
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action : PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setAuthenticated: (state, action : PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action : PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { setAuthChecked, setAuthenticated, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
