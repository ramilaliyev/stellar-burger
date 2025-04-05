import React from "react";

import styles from './order-stats.module.css';

type TOrderStats = {
    total: number;
    totalToday: number;
    doneOrders: number[];
    pendingOrders: number[];
};

export const OrderStats = ({total, totalToday, doneOrders, pendingOrders} : TOrderStats) : React.JSX.Element => {
    return (
        <div className={styles.container}>
            
            <div className={`${styles.ordersActual} mb-15`}>
                <div className={`mr-9 ${styles.orderNums}`}>
                    <h4 className="text text_type_main-medium pb-6">
                        Готовы:
                    </h4>
                    <ul>
                        {doneOrders.map((number, index) => (
                            <li key={index} className={`${styles.orderNum} ${styles.orderReady} text text_type_digits-default mb-2`}>
                                {number}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.orderNums}>
                    <h4 className="text text_type_main-medium pb-6">
                        В работе:
                    </h4>
                    <ul>
                        {pendingOrders.map((number, index) => (
                            <li key={index} className={`${styles.orderNum} ${styles.orderReady} text text_type_digits-default mb-2`}>
                                {number}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={`${styles.ordersTotal} mb-15`}>
                <h4 className="text text_type_main-medium">
                    Выполнено за все время:
                </h4>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className={`${styles.ordersTotal} mb-15`}>
                <h4 className="text text_type_main-medium">
                    Выполнено за сегодня:
                </h4>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </div>
    )
}