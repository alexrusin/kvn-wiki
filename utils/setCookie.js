import Cookies from 'cookies'
import encrypt from './encrypt'

export default function setCookie(req, res, cookieName, cookieValue, expiresDays = 0) {
    const cookies = new Cookies(req, res)
    let options = {
        httpOnly: true
    }

    if (expiresDays) {
        const expires = new Date();
        expires.setDate(expires.getDate() + expiresDays);
        options['expires'] = expires
    }

    cookies.set(cookieName, encrypt(cookieValue), options)
}