import React from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useNavigate} from "react-router-dom";

import styles from './not-found.module.css';
import notFound from '../../images/404.png';


export const NotFound = () : React.JSX.Element => {
    const navigate = useNavigate();
    
    const toMain = () => {
        navigate('/');
        localStorage.setItem('isOpen', 'false');
    }
    
    return (
        <section className={styles.section}>
            <img src={notFound} alt="Not found" className={styles.img}/>
            <h1 className="text text_type_main-medium mt-6 mb-10">
                Страница удалена или не существует
            </h1> 
            <Button htmlType="button" type="primary" size="large" onClick={toMain}>
                На главную
            </Button>
        </section>
    )
}