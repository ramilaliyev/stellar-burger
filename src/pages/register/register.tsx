import React, { FormEvent, useState } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './register.module.css';

import { handleChange } from '../../utils/handleChange';
import { api } from '../../utils/api';

export const Register = (): React.JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        api.register(name, email, password)
        .then(data => {
            if (data.success) {
                localStorage.setItem("accessToken", data["accessToken"]);
                localStorage.setItem("refreshToken", data["refreshToken"]);
                navigate('/login');
            } else {
                setError(`Ошибка: ${data.message}`);
            }
        })
        .catch(err => setError(`Ошибка: ${err}`))
        .finally(() => {
            setIsLoading(false);
        })
    }

    const toLogin = () => {
        navigate('/login', {state: location});
    }

    return (
        <>
            <h1 className="text text_type_main-medium mb-6">
                Регистрация
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-6">
                    <Input placeholder='Имя' onChange={handleChange(setName)} value={name} required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                </div>
                <div className="mb-6">
                    <EmailInput  onChange={handleChange(setEmail)} value={email} required/>
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={handleChange(setPassword)} value={password} required/>
                </div>
                <div className="mb-20">
                    <Button htmlType="submit" type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Уже зарегистрированы? 
                <Button htmlType="button" type="secondary" size="medium" onClick={toLogin}>
                    Войти
                </Button>
            </p>
        </>
    )
}