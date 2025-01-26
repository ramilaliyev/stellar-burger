import React from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientCard from "../ingredient-card/ingredient-card";
import styles from './burger-ingredients.module.css';



const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('bun');
  
    return (
        
        <section className={styles.container}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className="mb-8" style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredientsDisplay}>
                <BurgerIngredientsGroup title={"Булки"}>
                    {props.ingredients.filter(item => item.type === 'bun').map((ingredient) => (
                    <IngredientCard 
                        key={ingredient._id} 
                        name={ingredient.name} 
                        price={ingredient.price} 
                        image={ingredient.image} 
                    />
                    ))}
                </BurgerIngredientsGroup>
                <BurgerIngredientsGroup title={"Соусы"}>
                    {props.ingredients.filter(item => item.type === 'sauce').map((ingredient) => (
                        <IngredientCard 
                            key={ingredient._id} 
                            name={ingredient.name} 
                            price={ingredient.price} 
                            image={ingredient.image} 
                        />
                    ))}
                </BurgerIngredientsGroup>
                <BurgerIngredientsGroup title={"Начинки"}>
                    {props.ingredients.filter(item => item.type === 'main').map((ingredient) => (
                        <IngredientCard 
                            key={ingredient._id} 
                            name={ingredient.name} 
                            price={ingredient.price} 
                            image={ingredient.image} 
                        />
                    ))}
                </BurgerIngredientsGroup>
            </div>
        </section>
    )
}

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

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array
}

BurgerIngredientsGroup.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
}

export default BurgerIngredients;