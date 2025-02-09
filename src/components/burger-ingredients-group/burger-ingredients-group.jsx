import React from "react";
import PropTypes from "prop-types";
import styles from './burger-ingredients-group.module.css';

const BurgerIngredientsGroup = props => {
    return (
        <>
            <h2 className="text text_type_main-medium mb-6 mt-2" value={props.type}>{props.title}</h2>
            <div className={`ml-1 mr-1 ${styles.ingredientsGrid}`}>
                {props.children}
            </div>
        </>
    )
}

BurgerIngredientsGroup.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
}

export default BurgerIngredientsGroup;