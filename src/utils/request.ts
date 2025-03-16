import { checkResponse } from "./checkResponse";

const URL = 'https://norma.nomoreparties.space/api';

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return fetch(`${URL}${endpoint}`, options)
    .then(response => checkResponse<T>(response))
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    });
}
