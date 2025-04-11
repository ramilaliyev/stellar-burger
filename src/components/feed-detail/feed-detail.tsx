import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/appHooks";
import { OrderComponents } from "../order-components/order-components";
import { getIngredientDetails } from "../../services/slices/ingredientDetailSlice";
import { TIngredient } from "../../types/types";
import { baseURL } from "../../utils/baseURL";

import styles from "./feed-detail.module.css";

const URL = `${baseURL}/ingredients`;

export const FeedDetail = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.feed.message);
    const parsedMessage = message ? JSON.parse(message) : { orders: [] };


    const [loadedIngredients, setLoadedIngredients] = useState<Map<string, TIngredient>>(new Map());

    // Функция для получения ингредиента по ID
    const getIngredientById = async (id: string): Promise<TIngredient | null> => {   
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

    useEffect(() => {
        const fetchOrderTotals = async () => {
            const newLoadedIngredients = new Map<string, TIngredient>();

            for (const order of parsedMessage.orders) {
                for (const ingredientId of order.ingredients) {
                    if (!newLoadedIngredients.has(ingredientId)) {
                        const ingredient = await getIngredientById(ingredientId);
                        if (ingredient) {
                            newLoadedIngredients.set(ingredientId, ingredient);
                        }
                    }
                }
            }

            setLoadedIngredients(newLoadedIngredients);
        };

        if (parsedMessage.orders.length > 0) {
            fetchOrderTotals();
        }
    }, [parsedMessage.orders, dispatch]); // Добавляем `dispatch` в зависимости

    return (
        <div className={`pt-30 ${styles.wrapper}`}>
            <OrderComponents loadedIngredients={loadedIngredients} />
        </div>
    );
};
