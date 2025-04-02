import { combineReducers } from "redux";
import ingredientReducer from './slices/ingredientSlice';
import ingredientDetailsReducer from './slices/ingredientDetailSlice';
import burgerConstructorSlice from "./slices/burgerConstructorSlice";
import orderDetailsSlice from './slices/orderDetailsSlice';
import authSlice from './slices/authSlice';
import loginSlice from './slices/loginSlice';
import feedSlice from './slices/feedSlice';
import ordersSlice from './slices/ordersSlice';
import orderComponentsReducer from './slices/orderComponentsSlice';

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorSlice,
    orderDetails: orderDetailsSlice,
    auth: authSlice,
    login: loginSlice,
    feed: feedSlice,
    orders: ordersSlice,
    orderComponents: orderComponentsReducer
});

export default rootReducer;
