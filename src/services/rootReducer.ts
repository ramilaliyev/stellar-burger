import { combineReducers } from "redux";
import ingredientReducer from './slices/ingredientSlice';
import ingredientDetailsReducer from './slices/ingredientDetailSlice';
import burgerConstructorSlice from "./slices/burgerConstructorSlice";
import orderDetailsSlice from './slices/orderDetailsSlice';
import authSlice from './slices/authSlice';
import loginSlice from './slices/loginSlice';

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorSlice,
    orderDetails: orderDetailsSlice,
    auth: authSlice,
    login: loginSlice
});

export default rootReducer;
