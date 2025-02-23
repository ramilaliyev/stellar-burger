import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate, NavLink, Outlet } from 'react-router-dom';

import { api } from '../../utils/api';

import styles from './profile.module.css';

export const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const logoutFunc = e => {
        e.preventDefault();

        const token = localStorage.getItem("refreshToken");

        api.logout(token)
        .then(data => {
            if (data.success) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                navigate('/login');
            } 
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    return (
        <div className={styles.container}>
            <div className={`mr-15 ${styles.menu}`}>
                <ul className={`mb-20 ${styles.menu__list}`}>
                    <li className={`${styles.menu__item}`}>
                        <NavLink to="/profile" end className={({isActive}) => `text text_type_main-medium ${isActive ? "" : "text_color_inactive"}`}>
                            Профиль
                        </NavLink>
                    </li>
                    <li className={`${styles.menu__item}`}>
                        <NavLink to="/profile/orders" className={({isActive}) => `text text_type_main-medium ${isActive ? "" : "text_color_inactive"}`}>
                            История заказов
                        </NavLink>
                    </li>
                    <li className={`${styles.menu__item}`}>
                        <NavLink className="text text_type_main-medium text_color_inactive" onClick={logoutFunc}>
                            Выход
                        </NavLink>
                    </li>
                </ul>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>        
    )
}