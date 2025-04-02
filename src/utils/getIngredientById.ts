import { useDispatch } from "react-redux";
import { getIngredientDetails } from "../services/slices/ingredientDetailSlice";
import { TIngredient } from "../types/types";
import { AppDispatch } from "../services/store";


const URL = 'https://norma.nomoreparties.space/api/ingredients';

// Получение ингредиента по ID
export const getIngredientById = async (id: string): Promise<TIngredient | null> => {   
    const dispatch = useDispatch<AppDispatch>();
    
    try {
        const result = await dispatch(
            getIngredientDetails({ URL, id })
        ).unwrap(); 
        return result;
    } catch (error) {
        console.error("Ошибка при загрузке ингредиента:", error);
        return null;
    }
};