// import { createSlice } from '@reduxjs/toolkit';

// // Начальное состояние
// const initialState = {
//   isAuthChecked: false,  // Флаг, который указывает, была ли проверка токена
//   isAuthenticated: false, // Флаг, который указывает, авторизован ли пользователь
//   accessToken: localStorage.getItem('accessToken') || null, // Токен доступа из localStorage
// };

// // Слайс авторизации
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuthChecked: (state, action) => {
//       state.isAuthChecked = action.payload; // Устанавливаем флаг, что проверка токена завершена
//     },
//     setAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload; // Устанавливаем флаг авторизации
//     },
//     setAccessToken: (state, action) => {
//       state.accessToken = action.payload; // Устанавливаем новый токен
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;  // Убираем флаг авторизации
//       state.accessToken = null;  // Удаляем токен
//       localStorage.removeItem('accessToken');  // Удаляем токен из localStorage
//     },
//   },
//   extraReducers: (builder) => {
//     // Дополнительные редюсеры, если понадобится обработать другие асинхронные экшены
//   },
// });

// // Экспортируем экшены и редюсер
// export const { setAuthChecked, setAuthenticated, setAccessToken, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  isAuthChecked: false,  // Флаг, который указывает, была ли проверка токена
  isAuthenticated: false, // Флаг, который указывает, авторизован ли пользователь
  accessToken: localStorage.getItem('accessToken') || null, // Токен доступа из localStorage
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
      localStorage.setItem('accessToken', action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setAuthChecked, setAuthenticated, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
