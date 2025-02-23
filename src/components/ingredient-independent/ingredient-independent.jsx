import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredients } from '../../services/slices/ingredientSlice';

import IngredientProp from '../ingredient-prop/ingredient-prop';


const URL = 'https://norma.nomoreparties.space/api/ingredients';

import styles from './ingredient-independent.module.css';


export const IngredientIndependent = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { ingredients, loading, error } = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(getIngredients(URL));
    }, [dispatch]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Произошла ошибка: {error}</p>;
    }
    
    const ingredient = ingredients.find(item => item._id === id);

    if (!ingredient) {
        return <p className="text text_type_main-medium">Ингредиент не найден или загружается...</p>;
    }

    return (
        <div className={`mt-30 ${styles.container}`}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            {loading && 'Загрузка...'}
            {error && 'Произошла ошибка'}
            {!loading &&
            !error &&
            ingredient &&
            <div className="mb-8">
                <img src={ingredient.image_large} alt={ingredient.name} className={`mb-4`}/>
                <p className={`text text_type_main-medium mb-8`}>{ingredient.name}</p>
                <ul className={`${styles.propsList}`}>
                    <IngredientProp name="Калории,ккал" value={ingredient.calories} />
                    <IngredientProp name="Белки, г" value={ingredient.proteins} />
                    <IngredientProp name="Жиры, г" value={ingredient.fat} />
                    <IngredientProp name="Углеводы, г" value={ingredient.carbohydrates} />
                </ul>
            </div>}
        </div>
    );
}
