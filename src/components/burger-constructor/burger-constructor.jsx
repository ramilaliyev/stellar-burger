import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import PropTypes from 'prop-types'; 

import styles from './burger-constructor.module.css';
import { useMemo, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { useSelector, useDispatch } from "react-redux";
import { removeIngredient, addIngredient, addBun, moveIngredient } from "../../services/slices/burgerConstructorSlice";
import { setOrderDetails } from "../../services/slices/orderDetailsSlice";


const BurgerConstructor = (props) => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(state => state.burgerConstructor);

    const [{ canDrop, isOver, handlerId }, drop] = useDrop(() => ({
        accept: "ingredient",
        drop: (item) => {
            if (!item.fromBurgerConstructor) {
                if (item.type === 'bun') {
                    dispatch(addBun(item));
                } else {
                    dispatch(addIngredient(item));
                }
            }
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(), 
          handlerId: monitor.getHandlerId()
        }),
    }));

    const moveCard = (fromIndex, toIndex) => {
        dispatch(moveIngredient({ fromIndex, toIndex }));
    };

    const totalPrice = useMemo(() => {
        const bunPrice = bun ? bun.price : 0;
        const ingredientsPrice = ingredients.reduce((sum, item) => sum += item.price, 0);
        return bunPrice * 2 + ingredientsPrice;
    }, [bun, ingredients]);

    const orderRequest = bun
    ? [bun._id, ...ingredients.map(item => item._id), bun._id]
    : ingredients.map(item => item._id);

    const handleOrder = () => {
        dispatch(setOrderDetails({
            URL: 'https://norma.nomoreparties.space/api/orders',
            
            ingredients: orderRequest
        }))
    }

    return (
        <section ref={drop} className={`${styles.container} pt-25 ml-10 mb-10 pl-1 pr-1`}>
            <div className={`${styles.ingredient} ${styles.ingredientTop} ml-8`} >
                {bun ? (
                    <ConstructorElement type="top" 
                    isLocked={true} 
                    text={`${bun.name} (верх)`} 
                    key={bun._id} 
                    price={bun.price} 
                    thumbnail={bun.image}/> 
                ) : (
                    <p>Выберите булки</p>
                )}
            </div>
            <div className={`mt-4 ${ingredients.length === 0 ? `mb-4` : ''} ${styles.mains}`}>
                {ingredients.length > 0 ? (
                    ingredients
                        .filter(ingredient => ingredient.name !== '')  // Убираем пустые элементы, если они есть
                        .map((ingredient, index) => (
                            ingredient.type !== "bun" && (
                                <DraggableIngredient 
                                    key={ingredient.uniqueId} 
                                    ingredient={ingredient} 
                                    index={index} 
                                    moveCard={moveCard}
                                />
                            )
                        ))
                ) : (
                    <div className={`${styles.mainItem} ${styles.ingredient} ml-8`}>
                        <p>Выберите ингредиенты</p>
                    </div>
                )}
            </div>
            <div className={`mb-10 ${styles.ingredient} ${styles.ingredientBottom} ml-8`} >
                {bun ? (
                        <ConstructorElement type="bottom" 
                        isLocked={true} 
                        text={`${bun.name} (низ)`} 
                        key={bun._id} 
                        price={bun.price} 
                        thumbnail={bun.image}/> 
                    ) : (
                        <p>Выберите булки</p>
                    )}
                </div>
            <div className={`pr-8 ${styles.result}`}>
                <div className={`${styles.resultPrice} mr-10`}>
                    <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
                    <CurrencyIcon className={styles.icon}/>
                </div>
                <div className="btn" onClick={props.orderBtnFunc}>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    orderBtnFunc: PropTypes.func,
}

export default BurgerConstructor;

