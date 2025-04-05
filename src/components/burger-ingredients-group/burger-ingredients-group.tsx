import React, { ReactNode } from "react";
import styles from './burger-ingredients-group.module.css';

type TBurgerIngredientsGroupProps = {
    type?: string;
    title: string;
    children?: ReactNode 
};

const BurgerIngredientsGroup = (props : TBurgerIngredientsGroupProps) : React.JSX.Element => {
    return (
        <>
            <h2 className="text text_type_main-medium mb-6 mt-2" /*value={props.type}*/>{props.title}</h2>
            <div className={`ml-1 mr-1 ${styles.ingredientsGrid}`}>
                {props.children}
            </div>
        </>
    )
}

export default BurgerIngredientsGroup;