import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientCard from "../ingredient-card/ingredient-card";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";

import styles from './burger-ingredients.module.css';

const BurgerIngredients = (props) => {
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const [current, setCurrent] = React.useState('bun');
    const containerRef = useRef(null);

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const sections = [
        {id: "bun", ref: bunRef, title: "Булки"},
        {id: "sauce", ref: sauceRef, title: "Соусы"},
        {id: "main", ref: mainRef, title: "Начинки"}
    ];
    
    const handleScroll = (sections) => {
        if (!containerRef.current) return;

        const containerTop = containerRef.current.getBoundingClientRect().top;

        let closestSection = sections[0].id;
        let minDistance = Infinity;

        sections.forEach(section => {
            if (section.ref.current) {
                const distance = Math.abs(section.ref.current.getBoundingClientRect().top - containerTop);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section.id;
                }
            };

        });

        setCurrent(closestSection)
    };

    const handleClick = (value) => {
        const section = sections.find(section => section.id === value);
        
        if (section && section.ref.current) {
            section.ref.current.scrollIntoView({ behavior: "smooth" });
        }
    
        setCurrent(value);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("scroll", () => handleScroll(sections));
        return () => container.removeEventListener("scroll", () => handleScroll(sections));
    }, []);


    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`mb-8 ${styles.tabList}`}>
                <Tab value="bun" active={current === 'bun'} onClick={() => handleClick('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => handleClick('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => handleClick('main')}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredientsDisplay} ref={containerRef}>
                {sections.map((section, index) => {
                    return (
                        <div ref={section.ref} key={index}>
                            <BurgerIngredientsGroup title={section.title}>
                                {ingredients.filter(item => item.type === section.id).map((ingredient) => (
                                <IngredientCard 
                                    key={ingredient._id} 
                                    {...ingredient}
                                    ingredientBtnFunc={() => props.ingredientBtnFunc(ingredient)}
                                    >
                                </IngredientCard>
                                ))}
                            </BurgerIngredientsGroup>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array,
    ingredientBtnFunc: PropTypes.func
}


export default BurgerIngredients;