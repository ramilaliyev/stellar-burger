import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { feedMiddleware } from './middleware/feedMiddleware'; // Путь к вашему миддлвару
import { ordersMiddleware } from "./middleware/ordersMiddleware";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware), // Добавляем ваш миддлвар сюда
    devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

export default store;