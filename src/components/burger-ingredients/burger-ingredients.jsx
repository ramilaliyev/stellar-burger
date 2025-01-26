import React from "react";
import PropTypes from "prop-types";

import { Tab, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientCard from "../ingredient-card/ingredient-card";
import styles from './burger-ingredients.module.css';

const countIngredients = (arr) => {
    const counts = {};
    arr.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1; // Увеличиваем счётчик для каждого элемента
    });
    return counts;
};

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('bun');
    

    return (
        
        <section className={styles.container}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`mb-8 ${styles.tabList}`}>
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
                        ingredientBtnFunc={() => props.ingredientBtnFunc(ingredient)}
                        >
                        {ingredient._id === "643d69a5c3f7b9001cfa093c" && <Counter count={1} size="default" extraClass="m-1" />}
                        </IngredientCard>
                    ))}
                </BurgerIngredientsGroup>
                <BurgerIngredientsGroup title={"Соусы"}>
                    {props.ingredients.filter(item => item.type === 'sauce').map((ingredient) => (
                        <IngredientCard 
                            key={ingredient._id} 
                            name={ingredient.name} 
                            price={ingredient.price} 
                            image={ingredient.image} 
                            ingredientBtnFunc={() => props.ingredientBtnFunc(ingredient)}
                        >
                        {ingredient._id === "643d69a5c3f7b9001cfa0944" && <Counter count={1} size="default" extraClass="m-1" />}
                        </IngredientCard>
                    ))}
                </BurgerIngredientsGroup>
                <BurgerIngredientsGroup title={"Начинки"}>
                    {props.ingredients.filter(item => item.type === 'main').map((ingredient) => (
                        <IngredientCard 
                            key={ingredient._id} 
                            name={ingredient.name} 
                            price={ingredient.price} 
                            image={ingredient.image} 
                            ingredientBtnFunc={() => props.ingredientBtnFunc(ingredient)}
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
    ingredients: PropTypes.array,
    ingredientBtnFunc: PropTypes.func
}

BurgerIngredientsGroup.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
}

export default BurgerIngredients;