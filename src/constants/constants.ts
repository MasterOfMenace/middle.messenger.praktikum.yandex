export const nameRegex = /^[A-Za-zА-Яа-я-]+$/gi;
export const loginRegex = /(?!^\d+$)^[\w_-]+$/gi;
export const emailRegex = /^\S+@\w+\.\w+/gi;
export const passwordRegex = /^(?=.*[a-z])[\S]*[A-Z]{1,}[\S]*$/gi;
export const phoneNumberRegex = /^[+]?\d{10,15}/gi;

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
