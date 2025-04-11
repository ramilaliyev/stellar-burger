import React from "react";
import { useAppDispatch, useAppSelector } from "../../utils/appHooks";
import { useParams } from "react-router-dom";

import IngredientProp from '../ingredient-prop/ingredient-prop';

import styles from './ingredient-independent.module.css';

import { RootState } from "../../services/store";
import { TIngredient } from "../../types/types";

type TResult = {
    ingredients: TIngredient[];
    loading: boolean;
    error: string | null;
}

export const IngredientIndependent = () : React.JSX.Element => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { ingredients, loading, error } = useAppSelector<RootState, TResult> ((state) => ({
        ingredients: state.ingredients.ingredients || [], // Гарантируем массив
        loading: state.ingredients.loading,
        error: state.ingredients.error
    }));
    


    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Произошла ошибка: {error}</p>;
    }
    
    const ingredient : TIngredient | undefined = ingredients.find((item : TIngredient) => item._id === id);

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
