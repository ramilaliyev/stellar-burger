import React, { useEffect } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../utils/appHooks";
import { useParams } from "react-router-dom";
import { getOrderComponents } from "../../services/slices/orderComponentsSlice";
import { TIngredient } from "../../types/types";
import styles from './order-components.module.css';
import { baseURL } from "../../utils/baseURL";

export const OrderComponents = (): React.JSX.Element => {
  let { number } = useParams<{ number: string }>(); // получаем orderNumber из URL
  const dispatch = useAppDispatch();
  
  const { components, loading, error } = useAppSelector((state) => state.orderComponents);
  
  const ingredients: TIngredient[] = useAppSelector((state) => state.ingredients.ingredients);
  const ingredientsMap = ingredients.reduce((map, ingredient) => {
    map.set(ingredient._id, ingredient);
    return map;
  }, new Map<string, TIngredient>()); 
  
  useEffect(() => {
    const orderNumber = number || localStorage.getItem('orderNum'); // используем number из params или localStorage
    if (orderNumber) {
      const URL = `${baseURL}/orders/${orderNumber}`;
      dispatch(getOrderComponents({ URL, number: orderNumber }));
    }
  }, [dispatch, number]); // перезапускаем, если number изменится

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const amount = components?.ingredients?.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const amountArray = Object.entries(amount || {}).map(([id, count]) => ({ id, count }));

  // Calculate total price
  const total = amountArray.reduce((acc, item) => {
    const ingredient = ingredientsMap.get(item.id);
    if (ingredient) {
      return acc + (item.count * ingredient.price);
    }
    return acc;
  }, 0);

  return (
    <div className={`${styles.detail}`}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
        {components ? `#${components.number}` : "#000000"}
      </p>
      <p className="text text_type_main-default mb-3">
        {components ? `${components.name}` : "Имя"}
      </p>
      <p className={`text text_type_main-small mb-15 ${styles.done}`}>
        {components ? 
          (components.status === 'done' ? 'Выполнен' : 
            components.status === 'pending' ? 'В ожидании' : 'Отменен') 
          : 'Нет данных'}
      </p>
      <p className="text text_type_main-default mb-6">
        Состав:
      </p>
      <ul className={`${styles.ingredientsList} pr-6 mb-10`}>
        {amountArray.map((item, index) => {
          const ingredient = ingredientsMap.get(item.id);
          if (!ingredient) return null;

          return (
            <li key={index} className={`${styles.ingredient} mb-4`}>
              <div className={styles.ingredientContainer}>
                <div className={`${styles.imgWrapper} mr-4`}>
                  <div className={styles.imgInner}>
                    <img src={ingredient.image_large} alt="img" className={`${styles.img} mr-4`} />
                  </div>
                </div>
                <p className="text text_type_main-small mr-4">{ingredient.name}</p>
              </div>
              <div className={styles.price}>
                <span className="mr-2 text_type_digits-default ">
                  {item.count} x {ingredient.price}
                </span> 
                <CurrencyIcon type={"primary"} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.total}>
        <p className="text text_type_main-default text_color_inactive">
          {components ? 
            <FormattedDate date={new Date(components.createdAt)} /> : null}
        </p>
        <p className={styles.totalPrice}>
          <span className="text text_type_digits-default mr-2">{total}</span> 
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};
