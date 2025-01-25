import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const nums = [5, 4, 7, 8, 8];

    return (
        <section className={`${styles.container} pt-25 ml-10 mb-10 pl-1 pr-1`}>
            <div className="ml-8 pr-8">
                <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" key={props.ingredients[0]._id} price={props.ingredients[0].price} thumbnail={props.ingredients[0].image}/>
            </div>
            <div className={`pt-1 pb-1 pr-4 ${styles.mains}`}>
                {nums.map(num => {
                    return (
                        <div className="mt-4 mb-4" key={props.ingredients[num]._id}>
                            <div className={`mb-4 ${styles.mainItem}`}>
                                <DragIcon className="mr-2"/>
                                <ConstructorElement text={props.ingredients[num].name} price={props.ingredients[num].price} thumbnail={props.ingredients[num].image}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="ml-8 mb-10 pr-8">
                <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (Низ)" key={props.ingredients[0]._id} price={props.ingredients[0].price} thumbnail={props.ingredients[0].image}/>
            </div>
            <div className={styles.result}>
                <div className={`${styles.resultPrice} mr-10`}>
                    <span className="digits mr-2">6000</span>
                    <CurrencyIcon className={styles.icon}/>
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;