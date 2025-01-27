import styles from './ingredient-prop.module.css';
import PropTypes from 'prop-types';

const IngredientProp = props => {
    return(
        <li className={`text text_type_main-default text_color_inactive mr-5 ${styles.prop}`}>
            <span className={styles.name}>{props.name}</span>
            <span className={`digits ${styles.value}`}>{props.value}</span>
        </li>
    )
}

IngredientProp.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

export default IngredientProp;