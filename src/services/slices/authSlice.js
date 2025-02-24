import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthChecked: false,  
  isAuthenticated: false, 
  accessToken: localStorage.getItem('accessToken') || null, 
};

// Слайс авторизации
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action) => {
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
