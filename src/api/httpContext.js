import axios from "axios";

class HttpContext {

    token = '';
    refreshToken = '';
    constructor() {
        this.autoLogin();
    }

    init(val) {
        this.setToken(val.token);
        this.setRefreshToken(val.refreshToken);
    }

    autoLogin() {
        const token = localStorage.getItem('token')
        if(token) {
        }
    }

    setToken(val) {
        this.token = val;
        localStorage.setItem('token', val);
    }

    getToken =() => this.token || localStorage.getItem('token');

    setRefreshToken(val) {
        this.refreshToken = val;
        localStorage.setItem('refresh_token', val);
    }

    clearToken() {
        this.token = null;
        this.refreshToken = null;
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }
}


export default new HttpContext();