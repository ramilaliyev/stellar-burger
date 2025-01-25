import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import React  from "react";

import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    const [isClicked, setClick] = React.useState(false);
    const [count, setCounter] = React.useState(0);

    return (
        <div className={`mb-8 ${styles.ingredientDetails}`} onClick={() => {setClick(true); setCounter(prevCount => prevCount + 1)}}>
            <img src={props.image} alt={props.name} className="ml-1 mr-1"/>
            <p className={`mt-1 mb-1 ${styles.price}`}>
                <span className={`text mr-2 digits`}>{props.price}</span>
                <CurrencyIcon />
            </p>
            <p className="mt-1 mb-1">{props.name}</p>
            {isClicked &&
            (<Counter count={count} size="default" extraClass="m-1" />)}
        </div>
    )
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default IngredientDetails;