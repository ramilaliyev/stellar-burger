import React, { useState } from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './login.module.css';

import { handleChange } from '../../utils/handleChange';
import { api } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setAccessToken } from '../../services/slices/authSlice';

export const Login = () : React.JSX.Element => {
    localStorage.removeItem('isOpen');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); 
        setError('');

        try {
            const data = await api.login(email, password);
            if (data.success) {
                localStorage.setItem("accessToken", data["accessToken"]);
                localStorage.setItem("refreshToken", data["refreshToken"]);

                dispatch(setAccessToken(data["accessToken"]));
                dispatch(setAuthenticated(true));

                const fromPage = location.state?.from || "/";
                navigate(fromPage, { replace: true });
            } else {
                setError(`Ошибка: ${data.message}`);
            }
        } catch (err) {
            setError(`Ошибка: ${err}`);
        } finally {
            setIsLoading(false);  
        }
    };

    const toRegister = () => {
        navigate('/register', { state: location });
    };

    const toForgotPassword = () => {
        navigate('/forgot-password', { state: location });
    };

    return (
        <>
            {isLoading && <h1>Загрузка...</h1>}
            {error && <h1>Ошибка</h1>}

            {!isLoading && !error && 
                <>
                    <h1 className="text text_type_main-medium mb-6">
                        Вход
                    </h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <EmailInput onChange={handleChange(setEmail)} value={email} required />
                        </div>
                        <div className="mb-6">
                            <PasswordInput onChange={handleChange(setPassword)} value={password} required />
                        </div>
                        {error && <p className="text text_type_main-default text_color_error">{error}</p>}
                        <div className="mb-20">
                            <Button htmlType="submit" type="primary" size="large" disabled={isLoading}>
                                {isLoading ? "Загрузка..." : "Войти"}
                            </Button>
                        </div>
                    </form>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вы новый пользователь? 
                        <Button htmlType="button" type="secondary" size="medium" onClick={toRegister} disabled={isLoading}>
                            Зарегистрироваться
                        </Button>
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                        <Button htmlType="button" type="secondary" size="medium" onClick={toForgotPassword} disabled={isLoading}>
                            Восстановить пароль
                        </Button>
                    </p>
                </>
            }
        </>
    );
};
