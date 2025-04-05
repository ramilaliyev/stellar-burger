import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/appHooks";
import styles from './orders.module.css';

import { FeedItem } from "../feed-item/feed-item";
import { getLocalStorageItem } from "../../utils/getLSItem";
import { TIngredient, TOrderResponse } from "../../types/types";
import { baseURL } from "../../utils/baseURL";

import Modal from '../../components/modal/modal';
import { OrderComponents } from '../../components/order-components/order-components';
import { ordersConnectionStart, ordersConnectionClosed } from "../../services/slices/ordersSlice";
import { getIngredientDetails } from "../../services/slices/ingredientDetailSlice";


export const Orders = (): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(() => getLocalStorageItem('isOpen', false));
    const [isOrderModal, setIsOrderModal] = useState<boolean>(() => getLocalStorageItem('isOrderModal', false));
    const [isLoading, setIsLoading] = useState<boolean>(true);  

    const dispatch = useAppDispatch();
    
    const accessToken = localStorage.getItem("accessToken");
    let token = accessToken?.replace("Bearer ", "");

    useEffect(() => {
        dispatch(ordersConnectionStart({ endpoint: `/orders?token=${token}` }));
        
        return () => {
            dispatch(ordersConnectionClosed());
        };
    }, [dispatch]);

    const message = useAppSelector((state) => state.orders.message);

    const parsedMessage = useMemo(() => {
        try {
            return message ? JSON.parse(message) : { orders: [] };
        } catch (error) {
            console.error("Ошибка парсинга сообщения:", error);
            return { orders: [] }; 
        }
    }, [message]);
    

    useEffect(() => {
        if (parsedMessage) {
            setIsLoading(false); 
        }
    }, [parsedMessage.orders]);

    const closeAll = () => {
        setIsOpen(false);
        setIsOrderModal(false);
    };
    
    const handleOrderClick = (order: TOrderResponse) => {
        setIsOpen(true);
        setIsOrderModal(true);
        localStorage.setItem("orderNum", order.number.toString());
    };

    const [orderTotals, setOrderTotals] = useState<Map<string, number>>(new Map());

    const getIngredientById = async (id: string): Promise<TIngredient | null> => {        
        try {
            const result = await dispatch(
                getIngredientDetails({ URL : `${baseURL}/ingredients`, id })
            ).unwrap(); 
            return result;
        } catch (error) {
            console.error("Ошибка при загрузке ингредиента:", error);
            return null;
        }
    };

    useEffect(() => {
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
        localStorage.setItem('isOrderModal', JSON.stringify(isOrderModal));
    }, [isOpen, isOrderModal]);

    const calculateOrderTotal = async (ingredientIds: string[]): Promise<number> => {
        let total = 0;
        for (const id of ingredientIds) {
            const ingredient = await getIngredientById(id);
            total += ingredient?.price || 0;
        }
        return total;
    };
    
    useEffect(() => {
        if (!parsedMessage?.orders || parsedMessage.orders.length === 0) return; 

        const fetchOrderTotals = async () => {
            const newOrderTotals = new Map<string, number>();

            for (const order of parsedMessage.orders) {
                const orderTotal = await calculateOrderTotal(order.ingredients);
                newOrderTotals.set(order._id, orderTotal);
            }
            
            setOrderTotals(newOrderTotals);
        };

        fetchOrderTotals();
    }, [parsedMessage.orders]);

    return (
        <>
            {isLoading ? ( 
                <h2 className="text text_type_main-large">Загрузка заказов...</h2>  
            ) : (
                <ul className={`pr-4 ${styles.ordersList}`}>
                    {parsedMessage.orders ? (
                        Array.isArray(parsedMessage.orders) && parsedMessage.orders.map((order: TOrderResponse) => {
                            const orderTotal = orderTotals.get(order._id);
                            return (
                                <FeedItem 
                                    key={order._id} 
                                    feed={order} 
                                    path={`/profile/orders/${order.number}`}  
                                    orderTotal={orderTotal} 
                                    clickHandler={() => handleOrderClick(order)}
                                />
                            );
                        })
                    ) : (
                        <h2 className="text text_type_main-large">Нет заказов. Сделайте первый заказ или обновите страницу.</h2> 
                    )}
                </ul>
            )}

            <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll}>
                {isOrderModal && <OrderComponents/>}
            </Modal>
        </>
    );
};
