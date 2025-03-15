const URL = 'https://norma.nomoreparties.space/api';

import { TLogin, TRefreshToken, TRegister, TSuccessMessage, TUserData, TUserResponse } from "../types/types";

const forgotPassword = (email : string) : Promise<TSuccessMessage> => {

    const requestData = {
        email: email
    };

    return fetch(`${URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(res =>  res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

const resetPassword = (password : string, token : string) : Promise<TSuccessMessage> => {
    const requestData = {
        password: password, 
        token: token
    };

    return fetch(`${URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

const login = (email: string, password: string): Promise<TLogin> => {
    const requestData = {
        email: email,
        password: password
    };

    return fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

const logout = (token : string): Promise<TSuccessMessage> => {
    const requestData = {
        token: token
    };

    return fetch(`${URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

const register = (name: string, email: string, password: string): Promise<TRegister> => {
    const requsetData = {
        name: name,
        email: email,
        password: password
    };

    return fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requsetData)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

export const getToken = (): Promise<TRefreshToken>  => {
    const requestData = {
        token: localStorage.getItem('refreshToken')
    }

    return fetch(`${URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

export const getUser = (): Promise<TUserResponse> => {
    return fetch(`${URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

const updateUser = (userData : TUserData): Promise<TUserResponse> => {
    return fetch(`${URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    })
}

export const api = {
    forgotPassword,
    resetPassword,
    login,
    logout,
    register,
    getToken,
    getUser,
    updateUser
}