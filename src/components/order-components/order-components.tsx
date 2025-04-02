import React, { useEffect } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { feedConnectionStart } from "../../services/actions/feedActions";
import { RootState, AppDispatch } from "../../services/store";
import { getOrderComponents } from "../../services/slices/orderComponentsSlice";
import { getIngredientDetails } from "../../services/slices/ingredientDetailSlice";

import { TIngredient } from "../../types/types";

import styles from './order-components.module.css';

import img from '../../images/meat-01.png';

const URL = 'https://norma.nomoreparties.space/api/orders/all';

type TOrderComponents = {
    id: string | null;
    loadedIngredients: Map<string, TIngredient>;
};

export const OrderComponents = ({id, loadedIngredients} : TOrderComponents) : React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    // Dispatch асинхронного действия для получения данных
    useEffect(() => {
        if (id) {
            dispatch(getOrderComponents({ URL, id }));
        }
        dispatch(feedConnectionStart());
    }, [dispatch, id]);

    // Получаем данные из store
    const { components, loading, error } = useSelector((state: RootState) => state.orderComponents);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    
    const amount = components?.ingredients?.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    // Преобразуем объект в массив объектов
    const amountArray = Object.entries(amount || {}).map(([id, count]) => ({ id, count }));   
    
    return (
        <div className={`${styles.detail}`}>
            <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
                {components ? `#${components.number}` : "#000000"}
            </p>
            <p className="text text_type_main-default mb-3">
                {components ? `${components.name}` : "Имя"}
            </p>
            <p className={`text text_type_main-small mb-15 ${styles.done}`}>
                {components ? 
                (components.status === 'done' ? 'Выполнен' : 
                components.status === 'pending' ? 'В ожидании' : 'Отменен') 
                : 'Нет данных'}
            </p>
            <p className="text text_type_main-default mb-6">
                Состав:
            </p>
            <ul className={`${styles.ingredientsList} pr-6 mb-10`}>
                {amountArray.map((item, index) => {
                    const ingredient = loadedIngredients.get(item.id);
                    if (!ingredient) return null;

                    return (
                        // <p >{item.id} - {item.count}</p>
                        <li key={index} className={`${styles.ingredient} mb-4`}>
                            <div className={styles.ingredientContainer}>
                                <div className={`${styles.imgWrapper} mr-4`}>
                                    <div className={styles.imgInner}>
                                        <img src={ingredient.image_large} alt="img" className={`${styles.img} mr-4`} />
                                    </div>
                                </div>
                                <p className="text text_type_main-small mr-4">{ingredient.name}</p>
                            </div>
                            <div className={styles.price}>
                                <span className="mr-2 text_type_digits-default ">{item.count} x {ingredient.price}</span> <CurrencyIcon type={"primary"}/>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.total}>
                <p className="text text_type_main-default text_color_inactive">
                    {components ?
                        <FormattedDate date={new Date(components.createdAt)} /> : null
                    }
                </p>
                <p className={styles.totalPrice}>
                        <span className="text text_type_digits-default mr-2">{localStorage.getItem("totalPrice")}</span> <CurrencyIcon type="primary" />
                    </p>
                </div>
        </div>
    )
}