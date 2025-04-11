export const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Ошибка при парсинге localStorage[${key}]:`, error);
        return defaultValue;
    }
};
