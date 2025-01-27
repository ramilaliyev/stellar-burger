import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const nums = [2, 8, 5, 12, 6];

    return (
        <section className={`${styles.container} pt-25 ml-10 mb-10 pl-1 pr-1`}>
            <div className={`ml-8 pr-4 ${styles.ingredientBtn}`}>
                <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" key={props.ingredients[0]._id} price={props.ingredients[0].price} thumbnail={props.ingredients[0].image}/>
            </div>
            <div className={`pt-1 pb-1 ${styles.mains}`}>
              {nums.map((num) => {
                  const ingredient = props.ingredients[num];
                  return ingredient ? (
                      <div className="mt-4 mb-4 mr-8" key={ingredient._id}>
                          <div className={`mb-4 ${styles.mainItem}`}>
                              <DragIcon className="mr-2" />
                              <div className={styles.ingredientBtn}>
                                <ConstructorElement
                                    key={`${ingredient._id}-${Math.random()}`}
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
            <div className={`ml-8 mb-10 pr-8 ${styles.ingredientBtn}`}>
                <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (Низ)" key={props.ingredients[0]._id} price={props.ingredients[0].price} thumbnail={props.ingredients[0].image}/>
            </div>
            <div className={`pr-8 ${styles.result}`}>
                <div className={`${styles.resultPrice} mr-10`}>
                    <span className="text text_type_digits-medium mr-2">6000</span>
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
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
       name: PropTypes.string,
       type: PropTypes.string,
       proteins: PropTypes.number,
       fat: PropTypes.number,
       carbohydrates: PropTypes.number,
       calories: PropTypes.number,
       price: PropTypes.number,
       image: PropTypes.string,
       image_mobile: PropTypes.string,
       image_large: PropTypes.string,
       __v: PropTypes.number
    })).isRequired,
    orderBtnFunc: PropTypes.func,
    ingredientBtnFunc: PropTypes.func
}

export default BurgerConstructor;