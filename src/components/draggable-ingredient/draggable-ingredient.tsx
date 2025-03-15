import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { removeIngredient } from "../../services/slices/burgerConstructorSlice";
import styles from './draggable-ingredient.module.css';

import { TDraggableIngredient } from "../../types/types";

const DraggableIngredient = ({ ingredient, index, moveCard }: TDraggableIngredient): React.JSX.Element => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    
    const [, drag] = useDrag({
        type: "ingredient",
        item: { index, ingredient, fromBurgerConstructor: true }, // Передаем не только индекс, но и сам объект ингредиента
    });

    const [, drop] = useDrop({
        accept: "ingredient",
        hover:  (item: TDraggableIngredient) => {
            if (item.index !== index) { // Если текущий индекс не совпадает с индексом перетаскиваемого элемента
                moveCard(item.index, index); // Перемещаем элементы
                item.index = index; // Обновляем индекс после перемещения
            }
        }
    });

    drag(drop(ref)); // Объединяем drag и drop

    return (
        <div ref={ref} className={`${styles.mainItem} mb-4 mr-2`}>
            <DragIcon type="primary" className="mr-2" />
            <div className={`${styles.ingredient}`}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => dispatch(removeIngredient(ingredient.uniqueId))}
                />
            </div>
        </div>
    );
};

export default DraggableIngredient;
