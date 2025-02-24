import React, { useEffect, useState } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './reset-password.module.css';

import { handleChange } from '../../utils/handleChange';
import { api } from '../../utils/api';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        api.resetPassword(password, token)
        .then(data => {
            if (data.success) {
                navigate('/login');
            } else {
                setError(data.message)
            }
        })
        .catch((err) => {
            setError(`Произошла ошибка: ${err}`)
        })
        .finally(() => {
            setIsLoading(false);
        }) 
    }

    const toLogin = () => {
        navigate('/login', {state: location});
    }

    useEffect(() => {
        const isAllowed = localStorage.getItem("toReset");

        if (isAllowed !== "true") {
            navigate('/login');
        } 

        setTimeout(() => {localStorage.removeItem("toReset")}, 2000);

    }, [navigate]);

    return (
        <>
            <h1 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-6">
                    <PasswordInput placeholder='Введите новый пароль' onChange={handleChange(setPassword)} value={password} required/>
                </div>
                <div className="mb-6">
                    <Input placeholder='Введите код из письма' onChange={handleChange(setToken)} value={token} required/>
                </div>
                <div className="mb-20">
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
            </form>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль? 
                <Button htmlType="button" type="secondary" size="medium" onClick={toLogin}>
                    Войти
                </Button>
            </p>
        </>
    )
}