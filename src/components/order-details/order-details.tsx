import checkMarkImg from "../../images/done.svg"; 
import styles from "./order-details.module.css";
import {  useAppSelector } from "../../utils/appHooks";

const OrderDetails = () => {
    const orderDetails = useAppSelector((state) => state.orderDetails);

    if (orderDetails.loading) {
        return <p className={`text text_type_main-large mb-8 ${styles.code}`}>Загрузка....</p>
    }

    if (orderDetails.error) {
        return <p className={`text text_type_main-large mb-8 ${styles.code}`}>Ошибка!</p>
    }

    return (
        orderDetails.orderNum && (
            <>
                <p className={`text text_type_digits-large mb-8 ${styles.code}`} data-testid="order-code">{orderDetails.orderNum}</p>
                <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                <img src={checkMarkImg} alt="Done" className={`${styles.img} mb-15`} />
                <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
            </>
        )
    )
}

export default OrderDetails;