import { TLogin, TRefreshToken, TRegister, TSuccessMessage, TUserData, TUserResponse } from "../types/types";
import { request } from "./request";

const forgotPassword = (email: string): Promise<TSuccessMessage> => {
    return request<TSuccessMessage>('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
};


const resetPassword = (password : string, token : string) : Promise<TSuccessMessage> => {
    const requestData = {
        password: password, 
        token: token
    };

    return request<TSuccessMessage>('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });
}

const login = (email: string, password: string): Promise<TLogin> => {
    const requestData = {
        email: email,
        password: password
    };

    return request<TLogin>('/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
    });
}

const logout = (token : string): Promise<TSuccessMessage> => {
    const requestData = {
        token: token
    };

    return request<TSuccessMessage>('/auth/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    });
}

const register = (name: string, email: string, password: string): Promise<TRegister> => {
    const requsetData = {
        name: name,
        email: email,
        password: password
    };

    return request<TRegister>('/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requsetData)
    });
}

export const getToken = (): Promise<TRefreshToken>  => {
    const requestData = {
        token: localStorage.getItem('refreshToken')
    }

    return request<TRefreshToken>('/auth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    });
}

export const getUser = (): Promise<TUserResponse> => {
    return request<TUserResponse>(`/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("accessToken")}`
        }
    });
}

const updateUser = (userData : TUserData): Promise<TUserResponse> => {
    return request<TUserResponse>(`/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(userData)
    });
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