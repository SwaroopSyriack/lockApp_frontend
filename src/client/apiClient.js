import axios from "axios"

const BASE_URL = 'http://10.96.50.167/:80';

const api = axios.create({baseURL : BASE_URL,});


api.interceptors.request.use(

    config => {
        const token = localStorage.getItem('token')

        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    },

    error => { return Promise.reject(error)}

)


export default api;