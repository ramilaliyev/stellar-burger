import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from '../../utils/api';


import styles from './profile.module.css';

export const ProfileComponent = () => {
    const [nameValue, setNameValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");

    const [isChanged, setIsChanged] = useState(false);

    const inputRef = React.useRef(null);
    
    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const loadUser = () => {
        api.getUser()
        .then(data => {
            if (data.success) {
                setUser(data.user);
                setNameValue(data.user.name);
                setEmailValue(data.user.email);
            } else {
                setError("Не удалось загрузить данные");
            }
        })
        .catch(err => {
            setError("Ошибка загрузки данных: " + err.message);
        })
        .finally(() => {
            setIsLoading(false); 
        });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setIsChanged(true);
    }

    const handleReset = () => {
        setNameValue(user.name);
        setEmailValue(user.email);
        setPasswordValue('');
        setIsChanged(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        api.updateUser({name: nameValue, email: emailValue, password: passwordValue})
        .then(data => {
            if (data.success) {
                console.log(data);
            }
        })
        .catch(err => setError(`Ошибка: ${err}`))
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-6">
                <Input placeholder='Имя' icon={'EditIcon'} type={'text'} onChange={handleChange(setNameValue)}
                ref={inputRef} onIconClick={onIconClick} value={nameValue}/>
            </div>
            <div className="mb-6">
                <EmailInput isIcon={true} value={emailValue} onChange={handleChange(setEmailValue)} />
            </div>
            <div className="mb-6">
                <PasswordInput icon={"EditIcon"} value={passwordValue} onChange={handleChange(setPasswordValue)} />
            </div>
            {isChanged &&
                <div className={`${styles.btn_container} mb-6`}>
                    <Button htmlType="reset" type="secondary" size="large" onClick={handleReset}>
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
            }
        </form>
        
    )
}