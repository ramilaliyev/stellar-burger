import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import React  from "react";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../utils/appHooks";
import { Link, useLocation } from "react-router-dom";

import styles from './ingredient-card.module.css';

import { TIngredient } from "../../types/types";

type TIngredientCardProps = Pick<TIngredient, '_id' | 'name' | 'type' | 'image' | 'price' > & { ingredientBtnFunc: () => void };


const IngredientCard = (props : TIngredientCardProps) : React.JSX.Element => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ingredient",
        item: { _id : props._id, type: props.type, price: props.price, name: props.name, image: props.image },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        })
    }));

    const opacity = isDragging ? .4 : 1;

    
    const ingredientsInConstructor = useAppSelector((state) => state.burgerConstructor.ingredients);
    const bunInConstructor = useAppSelector((state) => state.burgerConstructor.bun);

    // const allIngredients : Array<TIngredient> = [...(bunInConstructor ? bunInConstructor : []), ...ingredientsInConstructor];
    const allIngredients: Array<TIngredient> = [
        ...(bunInConstructor ? [bunInConstructor] : []), 
        ...(Array.isArray(ingredientsInConstructor) ? ingredientsInConstructor : [])
    ];
    
    
    const ingredientCounts = allIngredients.reduce((acc : Record<string, number>, ingredient : TIngredient) : Record<string, number> => {
        if (ingredient) {
            if (ingredient.type === 'bun') {
                acc[ingredient._id] = 2;
            } else {
                acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
            }
        }
        return acc;
    }, {});
    
    const location = useLocation();

    return (
        <Link key={props._id} to={`/ingredients/${props._id}`} state={{backgroundLocation: location}}>
            <div className={`mb-8 ${styles.ingredientCard}`} onClick={props.ingredientBtnFunc} ref={drag} style={{ opacity }}> 
                <img src={props.image} alt={props.name} className="ml-1 mr-1"/>
                <p className={`mt-1 mb-1 ${styles.price}`}>
                    <span className={`text text_type_digits-default mr-2`}>{props.price}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <p className="mt-1 mb-1 text text_type_main-default">{props.name}</p>
                {ingredientCounts[props._id] > 0 && <Counter count={ingredientCounts[props._id]} size="default" extraClass="m-1" />}
            </div>
        </Link>
    )
}

export default IngredientCard;