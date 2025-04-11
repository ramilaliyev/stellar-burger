import styles from './ingredient-details.module.css';

import { useAppDispatch } from "../../utils/appHooks";

import IngredientProp from '../ingredient-prop/ingredient-prop';

import { addIngredient, addBun } from "../../services/slices/burgerConstructorSlice";

import { TDraggableIngredient } from '../../types/types';

const IngredientDetails = () : React.JSX.Element => {
    const dispatch = useAppDispatch();

    
     const ingredient: TDraggableIngredient | null = (() => {
        const ingredientFromStorage = localStorage.getItem('ingredient');
        if (!ingredientFromStorage) return null; 
        
        try {
            return JSON.parse(ingredientFromStorage);
        } catch (error) {
            console.error("Ошибка при парсинге ингредиента:", error);
            return null;
        }
    })();
    
    const handleClick = (value: TDraggableIngredient) => {
        if (value.type === 'bun') {
            dispatch(addBun(value));
        } else {
            dispatch(addIngredient(value));
        }
    }

    if (!ingredient) return <p className="text text_type_main-medium">Загрузка...</p>;

    return (
        <>
            <img src={ingredient.image} alt={ingredient.name} className={`mb-4 ${styles.img}`} onClick={() => handleClick(ingredient)}/>
            <p className={`text text_type_main-medium mb-8 ${styles.name}`}>{ingredient.name}</p>
            <ul className={`${styles.propsList}`} data-testid="ingredient-details">
                <IngredientProp name="Калории,ккал" value={ingredient.calories} />
                <IngredientProp name="Белки, г" value={ingredient.proteins} />
                <IngredientProp name="Жиры, г" value={ingredient.fat} />
                <IngredientProp name="Углеводы, г" value={ingredient.carbohydrates} />
            </ul>

        </>
    )
}

export default IngredientDetails;
