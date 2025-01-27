import {Logo, BurgerIcon, ListIcon, ProfileIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <Button htmlType="button" type="secondary" size="large" className={`${styles.btn} pt-4 pb-4 pl-5 pr-5`}>
                <BurgerIcon type="primary" className="mr-2"/>
                <p className="text text_type_main-default">
                    Конструктор
                </p>
            </Button>
            <Button htmlType="button" type="secondary" size="large" className={`${styles.btn} mr-30 pt-4 pb-4 pl-5 pr-5`}>
                <ListIcon type="secondary" className="mr-2"/>
                <p className="text text_type_main-default text_color_inactive">
                    Лента заказов
                </p>
            </Button>
            <Logo className="mr-30"/>
            <Button htmlType="button" type="secondary" size="large" className={`${styles.btn} ml-30 pt-4 pb-4 pl-5 pr-5`}>
                <ProfileIcon type="secondary" className="mr-2"/>
                <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>
            </Button>
        </header>
    )
}

export default AppHeader;