
import axios from "axios";
import Qs from 'qs'

axios.defaults.timeout = 30000

//请求前
axios.interceptors.request.use(async (config) => {
    const token = sessionStorage.getItem('token')
    console.log(token)
    config.headers['Content-type'] = 'application/x-www-form-urlencoded'
    config.headers['token'] = token 

    if(config.method === 'post' || config.method === 'put'){
        config.data = Qs.stringify(config.data)
    }
    return config;
}, (error) => {
    return Promise.error(error);
})
