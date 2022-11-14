import Cookies from 'js-cookie';
import cookie from 'cookie';

export const setLogin = () => {
    Cookies.set('ticket_user_is_login', true, { expires: 86400, sameSite: 'Lax' });
    window.location = '/';
};

export const isLogin = (RequestCookies = null) => {
    if (!RequestCookies) {
        return !!Cookies.get('ticket_user_is_login');
    }
    return !!cookie.parse(RequestCookies).ticket_user_is_login;
};

export const logOut = () => {
    Cookies.remove('ticket_user_is_login');
    window.location = '/login';
};
