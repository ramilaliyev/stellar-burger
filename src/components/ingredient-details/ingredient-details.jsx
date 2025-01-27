import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

import IngredientProp from '../ingredient-prop/ingredient-prop';

const IngredientDetails = props => {
    
    return (
        <>
            <img src={props.ingredients.image} alt={props.ingredients.name} className={`mb-4 ${styles.img}`}/>
            <p className={`text text_type_main-medium mb-8 ${styles.name}`}>{props.ingredients.name}</p>
            <ul className={`${styles.propsList}`}>
                <IngredientProp name="Калории,ккал" value={props.ingredients.calories} />
                <IngredientProp name="Белки, г" value={props.ingredients.proteins} />
                <IngredientProp name="Жиры, г" value={props.ingredients.fat} />
                <IngredientProp name="Углеводы, г" value={props.ingredients.carbohydrates} />
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