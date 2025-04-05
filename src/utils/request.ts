import { checkResponse } from "./checkResponse";
import { baseURL } from "./baseURL";


export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return fetch(`${baseURL}${endpoint}`, options)
    .then(response => checkResponse<T>(response))
    .then(data => data)
    .catch(() => {
        throw new Error('Произошла ошибка');
    });
}