import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const nums = [5, 7, 2, 12, 8];

    return (
        <section className={`${styles.container} pt-25 ml-10 mb-10 pl-1 pr-1`}>
            <div className={`ml-8 pr-8 ${styles.ingredientBtn}`} onClick={() => props.ingredientBtnFunc(props.ingredients[0])}>
                <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" key={props.ingredients[0]._id} price={props.ingredients[0].price} thumbnail={props.ingredients[0].image}/>
            </div>
            <div className={`pt-1 pb-1 pr-4 ${styles.mains}`}>
              {nums.map((num) => {
                  const ingredient = props.ingredients[num];
                  return ingredient ? (
                      <div className="mt-4 mb-4" key={ingredient._id}>
                          <div className={`mb-4 ${styles.mainItem}`}>
                              <DragIcon className="mr-2" />
                              <div className={styles.ingredientBtn} onClick={() => props.ingredientBtnFunc(ingredient)}>
                                <ConstructorElement
                                    key={ingredient._id}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                              </div>
                          </div>
                      </div>
                  ) : null;
              })}
            </div>
            <div className={`ml-8 mb-10 pr-8 ${styles.ingredientBtn}`} onClick={() => props.ingredientBtnFunc(props.ingredients[0])}>
                <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (Низ)" key={props.ingredients[0]._id} price={props.ingredients[0].price} thumbnail={props.ingredients[0].image}/>
            </div>
            <div className={`pr-8 ${styles.result}`}>
                <div className={`${styles.resultPrice} mr-10`}>
                    <span className="digits mr-2">6000</span>
                    <CurrencyIcon className={styles.icon}/>
                </div>
                <div className="btn" onClick={props.orderBtnFunc}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array.isRequired,
    orderBtnFunc: PropTypes.func,
    ingredientBtnFunc: PropTypes.func
}

export default BurgerConstructor;