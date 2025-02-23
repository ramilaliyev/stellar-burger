import React, { useState } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './forgot-password.module.css';

import { handleChange } from '../../utils/handleChange';
import { api } from '../../utils/api';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        api.forgotPassword(email)
        .then(data => {
            if (data.success) {
                localStorage.setItem("toReset", "true");
                navigate('/reset-password');
            } else {
                setError(data.message);
            }
        })
        .catch(() => {
            setError('Произошла ошибка')
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const toLogin = () => {
        navigate('/login', {state: location});
    }


    return (
        <>
            <h1 className="text text_type_main-medium mb-6">
                Восстановление пароля
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-6">
                    <EmailInput onChange={handleChange(setEmail)} value={email} required/>
                </div>
                <div className="mb-20">
                    <Button htmlType="submit" type="primary" size="large">
                        Восстановить
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вспомнили пароль? 
                    <Button htmlType="button" type="secondary" size="medium" onClick={toLogin}>
                        Войти
                    </Button>
                </p>
            </form>
        </>
    )
}