import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import IngredientProp from '../ingredient-prop/ingredient-prop';

import { addIngredient, addBun } from "../../services/slices/burgerConstructorSlice";

const IngredientDetails = () => {
    const dispatch = useDispatch();
    const ingredient = JSON.parse(localStorage.getItem('ingredient'));
    
    const handleClick = (value) => {
        if (value.type === 'bun') {
            dispatch(addBun(value));
        } else {
            dispatch(addIngredient(value));
        }
    }

    if (!ingredient) return <p className="text text_type_main-medium">Загрузка...</p>;

    return (
        <>
            <img src={ingredient.image} alt={ingredient.name} className={`mb-4 ${styles.img}`} onClick={() => handleClick(ingredient)}/>
            <p className={`text text_type_main-medium mb-8 ${styles.name}`}>{ingredient.name}</p>
            <ul className={`${styles.propsList}`}>
                <IngredientProp name="Калории,ккал" value={ingredient.calories} />
                <IngredientProp name="Белки, г" value={ingredient.proteins} />
                <IngredientProp name="Жиры, г" value={ingredient.fat} />
                <IngredientProp name="Углеводы, г" value={ingredient.carbohydrates} />
            </ul>

        </>
    )
}

IngredientDetails.propTypes = {
    ingredients : PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired}
    )
}

export default IngredientDetails;
