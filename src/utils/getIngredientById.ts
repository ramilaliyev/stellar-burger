import { useAppDispatch } from "../utils/appHooks";
import { getIngredientDetails } from "../services/slices/ingredientDetailSlice";
import { TIngredient } from "../types/types";
import { baseURL } from "./baseURL";


const URL = `${baseURL}/ingredients`;;

export const getIngredientById = async (id: string): Promise<TIngredient | null> => {   
    const dispatch = useAppDispatch();
    
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