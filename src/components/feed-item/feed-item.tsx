import React from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../types/types";

import styles from './feed-item.module.css';

type TOrderResponse = {
    ingredients: string[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};
    
type FeedItemProps =  {
    feed: TOrderResponse;
    path: string;
    loadedIngredients: Map<string, TIngredient>;
    orderTotal: number | undefined;
    clickHandler: () => void;
};

export const FeedItem = ({feed, path, loadedIngredients, orderTotal, clickHandler} : FeedItemProps) : React.JSX.Element => {
    const location = useLocation();
    
    return (
        <div className={`${styles.feedItem} p-6`}>
            <Link to={path} state={{backgroundLocation: location}} onClick={clickHandler}>
                <div className={`pb-6 ${styles.header}`}>
                    <p className="text text_type_digits-default">#{feed.number}</p>
                    <span className="text text_color_inactive text_type_main-default">
                        <FormattedDate date={new Date(feed.createdAt)} />
                    </span>
                </div>
                <p className={`${styles.name} text text_type_main-medium`}>
                    {feed.name || "Без названия"}
                </p>
                <div className={`pt-6 ${styles.details}`}>
                    <ul className={`${styles.ingredients} mr-6`}>
                        {feed.ingredients.slice(0, 6).map((itemId, index) => {
                            const ingredient = loadedIngredients.get(itemId);
                            if (!ingredient) return null;

                            const isOverflow = index === 5 && feed.ingredients.length > 6;
                            
                            return (
                                <li 
                                    key={index} 
                                    className={`${styles.ingredient} ${isOverflow ? styles.blured : ''}`}
                                    style={{ "--i": index } as React.CSSProperties}
                                >
                                    <div className={styles.ingredientContainer}>
                                        <img 
                                            src={ingredient.image_mobile} 
                                            alt={ingredient.name} 
                                            className={styles.ingredientImage}
                                        />
                                        {isOverflow && (
                                            <span className={`text text_type_digits-default ${styles.more}`}>
                                                +{feed.ingredients.length - 5}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <p className={styles.price}>
                        <span className="text text_type_digits-default mr-2">{orderTotal}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </Link>
        </div>
    )
}