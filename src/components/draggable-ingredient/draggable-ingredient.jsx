import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { removeIngredient } from "../../services/slices/burgerConstructorSlice";
import PropTypes from "prop-types";
import styles from './draggable-ingredient.module.css';

const DraggableIngredient = ({ ingredient, index, moveCard }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    
    const [, drag] = useDrag({
        type: "ingredient",
        item: { index, ingredient, fromBurgerConstructor: true }, // Передаем не только индекс, но и сам объект ингредиента
    });

    const [, drop] = useDrop({
        accept: "ingredient",
        hover:  (item) => {
            if (item.index !== index) { // Если текущий индекс не совпадает с индексом перетаскиваемого элемента
                moveCard(item.index, index); // Перемещаем элементы
                item.index = index; // Обновляем индекс после перемещения
            }
        }
    });

    drag(drop(ref)); // Объединяем drag и drop

    return (
        <div ref={ref} className={`${styles.mainItem} mb-4 mr-2`}>
            <DragIcon className="mr-2" />
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


DraggableIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
};

export default DraggableIngredient;
