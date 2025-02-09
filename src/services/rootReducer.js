import { combineReducers } from "redux";
import ingredientReducer from './slices/ingredientSlice';
import ingredientDetailsReducer from './slices/ingredientDetailSlice';
import burgerConstructorSlice from "./slices/burgerConstructorSlice";
import orderDetailsSlice from './slices/orderDetailsSlice';

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorSlice,
    orderDetails: orderDetailsSlice
});

export default rootReducer;
