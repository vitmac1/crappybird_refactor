// utils/cookies.js
export function getCookie(name) {
    const prefix = name + '=';

    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(prefix) === 0)
            return c.substring(prefix.length, c.length);
    }

    return '';
}

export function setCookie(name, value, exdays) {
    const date = new Date();

    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);

    const expires = 'expires=' + date.toUTCString();

    document.cookie = `${name}=${value}; ${expires}`;
}
