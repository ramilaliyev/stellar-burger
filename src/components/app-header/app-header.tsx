import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
    return (
        <header className={`${styles.header} mt-10 pt-4 pb-4`}>
            <NavLink to="/">
                {({isActive}) => (
                    <Button htmlType="button" size="large" className={`${styles.btn} pt-4 pb-4 pl-5 pr-5`}>
                        <BurgerIcon type={isActive ? "primary" : "secondary"} className="mr-2"/>
                        <p className={`text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                            Конструктор
                        </p>
                    </Button>
                )}
            </NavLink>
            <NavLink to="/feed" >
                {({isActive}) => (
                    <Button htmlType="button" size="large" className={`${styles.btn} mr-30 pt-4 pb-4 pl-5 pr-5`}>
                        <ListIcon type={isActive ? "primary" : "secondary"} className="mr-2"/>
                        <p className={`text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                            Лента заказов
                        </p>
                    </Button>
                )}
            </NavLink>
            <Logo className="mr-30"/>
            <NavLink to="/profile">
                {({isActive}) => (
                    <Button htmlType="button" size="large" className={`${styles.btn} ml-30 pt-4 pb-4 pl-5 pr-5`}>
                        <ProfileIcon type={isActive ? "primary" : "secondary"} className="mr-2"/>
                        <p className={`text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                            Личный кабинет
                        </p>
                    </Button>
                )}
            </NavLink>
        </header>
    )
}
