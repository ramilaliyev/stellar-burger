import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

import IngredientProp from '../ingredient-prop/ingredient-prop';

const IngredientDetails = props => {
    
    return (
        <>
            <img src={props.image} alt="Ingredient" className={`mb-4 ${styles.img}`}/>
            <p className={`text text_type_main-medium mb-8 ${styles.name}`}>{props.name}</p>
            <ul className={`${styles.propsList}`}>
                <IngredientProp name="Калории,ккал" value={props.calories} />
                <IngredientProp name="Белки, г" value={props.proteins} />
                <IngredientProp name="Жиры, г" value={props.fat} />
                <IngredientProp name="Углеводы, г" value={props.carbohydrates} />
            </ul>

        </>
    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}

export default IngredientDetails;