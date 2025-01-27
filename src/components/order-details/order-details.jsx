import checkMarkImg from "../../images/done.svg"; 
import styles from "./order-details.module.css";

const OrderDetails = () => {
    return (
        <>
            <p className={`text text_type_digits-large mb-8 ${styles.code}`}>034536</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={checkMarkImg} alt="Done" className={`${styles.img} mb-15`} />
            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}



export default OrderDetails;