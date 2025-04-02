import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedConnectionStart } from "../../services/actions/feedActions";
import { RootState, AppDispatch } from "../../services/store";
import { getIngredientDetails } from "../../services/slices/ingredientDetailSlice";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../types/types";
import styles from './test.module.css';

type TOrderResponse = {
    ingredients: string[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const Test = () => {
    const dispatch = useDispatch<AppDispatch>();
    const message = useSelector((state: RootState) => state.feed.message);
    const isConnected = useSelector((state: RootState) => state.feed.isConnected);
    const error = useSelector((state: RootState) => state.feed.error);

    const parsedMessage = message ? JSON.parse(message) : { orders: [] };

    const [orderTotals, setOrderTotals] = useState<Map<string, number>>(new Map());
    const [loadedIngredients, setLoadedIngredients] = useState<Map<string, TIngredient>>(new Map());

    useEffect(() => {
        dispatch(feedConnectionStart());
    }, [dispatch]);

    // Получение ингредиента по ID
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
    
    // Расчёт общей стоимости заказа
    const calculateOrderTotal = async (ingredientIds: string[]): Promise<number> => {
        let total = 0;
        for (const id of ingredientIds) {
            const ingredient = await getIngredientById(id);
            total += ingredient?.price || 0;
        }
        return total;
    };

    // Заполняем общие стоимости заказов
    useEffect(() => {
        const fetchOrderTotals = async () => {
            const newOrderTotals = new Map<string, number>();
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

                const orderTotal = await calculateOrderTotal(order.ingredients);
                
                newOrderTotals.set(order._id, orderTotal);
                
            }
            
            setOrderTotals(newOrderTotals);
            setLoadedIngredients(newLoadedIngredients);
            
        };

        if (parsedMessage.orders.length) {
            fetchOrderTotals();            
        }
    }, [parsedMessage.orders]);
        
    


    return (
        <div>
            <h2>WebSocket Авто-приём</h2>
            {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
            <p>Статус подключения: {isConnected ? "Подключено" : "Отключено"}</p>
            <ul>
                {parsedMessage.orders.map((msg: TOrderResponse, index: number) => {
                    const orderTotal = orderTotals.get(msg._id); // Получаем рассчитанную стоимость для этого заказа
                    return (
                        <div key={index} className={`${styles.feedItem} p-6`}>
                            <div className={styles.header}>
                                <p className="text text_type_digits-default">#{msg.number}</p>
                                <span className="text text_color_inactive text_type_main-default">
                                    <FormattedDate date={new Date(msg.createdAt)} />
                                </span>
                            </div>
                            <p className={`${styles.name} text text_type_main-medium pt-6 pb-6`}>
                                {msg.name || "Без названия"}
                            </p>
                            <div className={styles.details}>
                                <ul className={`${styles.ingredients} mr-6`}>
                                    {msg.ingredients.slice(0, 6).map((itemId, index) => {
                                        const ingredient = loadedIngredients.get(itemId);
                                        if (!ingredient) return null;

                                        const isOverflow = index === 5 && msg.ingredients.length > 6;
                                        
                                        return (
                                            <li 
                                                key={index} 
                                                className={`${styles.ingredient} ${isOverflow ? styles.blured : ''}`}
                                                style={{ "--i": index } as React.CSSProperties}
                                            >
                                                <div className={styles.ingredientContainer}>
                                                    <img 
                                                        src={ingredient.image_mobile} 
                                                        alt={ingredient.name} 
                                                        className={styles.ingredientImage}
                                                    />
                                                    {isOverflow && (
                                                        <span className={`text text_type_digits-default ${styles.more}`}>
                                                            +{msg.ingredients.length - 5}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <p className={styles.price}>
                                    <span className="text text_type_digits-default mr-2">{orderTotal}</span>
                                    <CurrencyIcon type="primary" />
                                </p>
                            </div>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};
