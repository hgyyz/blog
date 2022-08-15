import axios from "axios";



export const postAxios = (url,params, config) => {
    const data = axios.post(url,params, config).then((res) => {
        return res.data
    }).catch((error)=>{
        return error
    })
    return data
}

export const getAxios = (url,params, config) => {
    const data = axios.get(url,params, config).then((res) => {
        return res.data
    }).catch((error)=>{
        return error
    })
    return data
}