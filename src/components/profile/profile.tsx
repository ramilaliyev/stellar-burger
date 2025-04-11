import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';


import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from '../../utils/api';


import styles from './profile.module.css';

type TUser = {
    name: string;
    email: string;
};

export const ProfileComponent = (): React.JSX.Element => {
    const [nameValue, setNameValue] = React.useState<string>("");
    const [emailValue, setEmailValue] = React.useState<string>("");
    const [passwordValue, setPasswordValue] = React.useState<string>("");

    const [isChanged, setIsChanged] = useState<boolean>(false);

    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const [user, setUser] = useState<TUser>({name: "", email: ""}); 
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string>(""); 

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
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleChange = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setIsChanged(true);
    }

    const handleReset = (): void => {
        setNameValue(user.name);
        setEmailValue(user.email);
        setPasswordValue('');
        setIsChanged(false);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
        <>
            {isLoading && 'Загрузка данных...'}
            {error && 'Произошла ошибка при загрузке данных'}

            {!isLoading && !error &&
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <Input placeholder='Имя' icon={'EditIcon'} type={'text'} onChange={handleChange(setNameValue)}
                        ref={inputRef} onIconClick={onIconClick} value={nameValue} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
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
            }

        </>
        
    )
}