import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";

import styles from './burger-constructor.module.css';
import { useMemo, } from "react";
import { useDrop } from 'react-dnd';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient, addBun, moveIngredient } from "../../services/slices/burgerConstructorSlice";
import { setOrderDetails } from "../../services/slices/orderDetailsSlice";

import { RootState } from "../../services/store";
import { TIngredient, TDraggableIngredient } from "../../types/types";

const orderURL = 'https://norma.nomoreparties.space/api/orders';

type TBurgerConstructorProps = {
    orderBtnFunc: () => void;
};

type TAllIngredients = {
    bun: TDraggableIngredient | null;
    ingredients: TDraggableIngredient[];
}

const BurgerConstructor = (props : TBurgerConstructorProps) : React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector<RootState, TAllIngredients>((state) => ({
        bun: state.burgerConstructor.bun,
        ingredients: state.burgerConstructor.ingredients || []
    }));
    const { isAuthenticated } = useSelector((state : RootState) => state.auth);

    const [ _, drop] = useDrop(() => ({
        accept: "ingredient",
        drop: (item : TDraggableIngredient) => {
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

    const moveCard = ( fromIndex?: number, toIndex?: number ): void => {
        if (fromIndex !== undefined && toIndex !== undefined) {
            dispatch(moveIngredient({ fromIndex, toIndex }));
        }
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
        if (!isAuthenticated) {
            navigate("/login", { state: { from: "/" } });
            return;
        }

        // @ts-ignore
        dispatch(setOrderDetails({
            URL: orderURL,
            
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
                        .filter((ingredient : TIngredient) => ingredient.name !== '')
                        .map((ingredient : TIngredient, index) => (
                            ingredient.type !== "bun" && (
                                <DraggableIngredient 
                                    key={ingredient.uniqueId}
                                    ingredient={ingredient}
                                    index={index}
                                    moveCard={moveCard} _id={""} name={""} type={"bun"} proteins={0} fat={0} carbohydrates={0} calories={0} price={0} image={""} image_mobile={""} image_large={""}                                />
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
                    <CurrencyIcon type="primary" className={styles.icon}/>
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

export default BurgerConstructor;

