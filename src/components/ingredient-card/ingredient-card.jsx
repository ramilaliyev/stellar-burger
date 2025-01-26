import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import React  from "react";

import styles from './ingredient-card.module.css';

const IngredientCard = (props) => {
    return (
        <div className={`mb-8 ${styles.ingredientCard}`} onClick={props.ingredientBtnFunc}>
            <img src={props.image} alt={props.name} className="ml-1 mr-1"/>
            <p className={`mt-1 mb-1 ${styles.price}`}>
                <span className={`text text_type_digits-default mr-2`}>{props.price}</span>
                <CurrencyIcon />
            </p>
            <p className="mt-1 mb-1 text text_type_main-default">{props.name}</p>
            {props.children}
        </div>
    )
}

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredientBtnFunc: PropTypes.func.isRequired,
    children: PropTypes.any
}

export default IngredientCard;