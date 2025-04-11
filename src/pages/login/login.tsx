import React, { useState } from "react";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../services/store";

import styles from "./login.module.css";

import { handleChange } from "../../utils/handleChange";
import { useAppDispatch } from "../../utils/appHooks";
import { loginUser } from "../../services/actions/loginActions";

type TLoginResponse = {
    fromPage: string;
};

export const Login = (): React.JSX.Element => {
    localStorage.removeItem("isOpen");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(({ fromPage } : TLoginResponse) => {
                const redirectPath = location.state?.from || fromPage;
                navigate(redirectPath, { replace: true });
            })
            .catch((err : string) => setError(`Ошибка: ${err}`))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            {isLoading && <h1>Загрузка...</h1>}
            {error && <h1>Ошибка</h1>}

            {!isLoading && !error && (
                <>
                    <h1 className="text text_type_main-medium mb-6">Вход</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className="mb-6" data-testid="email-input">
                            <EmailInput onChange={handleChange(setEmail)} value={email} required />
                        </div>
                        <div className="mb-6" data-testid="password-input">
                            <PasswordInput onChange={handleChange(setPassword)} value={password} required />
                        </div>
                        {error && <p className="text text_type_main-default text_color_error">{error}</p>}
                        <div className="mb-20" data-testid="login-submit">
                            <Button htmlType="submit" type="primary" size="large" disabled={isLoading}>
                                {isLoading ? "Загрузка..." : "Войти"}
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};
