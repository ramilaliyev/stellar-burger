import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/appHooks";
import { useNavigate } from "react-router-dom";
import { feedConnectionStart, feedConnectionClosed } from "../../services/actions/feedActions";
import { getIngredientDetails } from "../../services/slices/ingredientDetailSlice";
import { TIngredient, TOrderResponse } from "../../types/types";
import styles from './feed.module.css';

import { FeedItem } from "../../components/feed-item/feed-item";
import { OrderStats } from "../../components/order-stats/order-stats";
import Modal from "../../components/modal/modal";
import { OrderComponents } from "../../components/order-components/order-components";

import { getLocalStorageItem } from "../../utils/getLSItem";
import { baseURL } from "../../utils/baseURL";


const URL = `${baseURL}/ingredients`;

export const Feed = () : React.JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(() => getLocalStorageItem('isOpen', false));
    const [isOrderModal, setIsOrderModal] = useState<boolean>(() => getLocalStorageItem('isOrderModal', false));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const closeAll = () => {
        setIsOpen(false);
        setIsOrderModal(false);
        navigate("/feed");
    };
    

    const message = useAppSelector((state) => state.feed.message);

    const parsedMessage = message ? JSON.parse(message) : { orders: [] };

    const handleOrderClick = (order: TOrderResponse) => {
        setIsOpen(true);
        setIsOrderModal(true);
        localStorage.setItem("orderNum", order.number.toString());
    };

    
    useEffect(() => {
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
        localStorage.setItem('isOrderModal', JSON.stringify(isOrderModal));
    }, [isOpen]);


    const [orderTotals, setOrderTotals] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        dispatch(feedConnectionStart({ endpoint: "/orders/all" }));

        return () => {
            dispatch(feedConnectionClosed());
        };
    }, [dispatch]);

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
    

    const doneOrders = 
    parsedMessage.orders.map((order : TOrderResponse) => order.status === 'done' ? order.number : null).slice(0, 10);

    const pendingOrders = 
    parsedMessage.orders.map((order : TOrderResponse) => order.status === 'pending' ? order.number : null).slice(0, 10);
    
    return (
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
            <div className={styles.container}>
                <div className={`pr-6 mr-15 ${styles.feedList}`}>
                    {parsedMessage.orders.map((order: TOrderResponse, index: number) => {
                        const orderTotal = orderTotals.get(order._id);
                        return (
                            <>
                                <FeedItem key={index} feed = {order} path = {`/feed/${order.number}`}  
                                orderTotal = {orderTotal} 
                                clickHandler = {() => handleOrderClick(order)}/>
                            </>
                        );
                    })}
                </div>
                <OrderStats total={parsedMessage.total} totalToday={parsedMessage.totalToday} doneOrders={doneOrders} pendingOrders={pendingOrders}/>
            </div>

            
            <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll}>
                {isOrderModal && <OrderComponents/>}
            </Modal>
        </>
    )
};