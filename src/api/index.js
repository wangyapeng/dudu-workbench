
import axios from 'axios';
import httpContext from './httpContext';

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bear ${httpContext.getToken()}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default axios;