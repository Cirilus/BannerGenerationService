import axios from 'axios';

export const API_URL = "https://84.38.185.14.sslip.io/api/v1"

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

api.interceptors.request.use((config) => {
    console.log('Request Config:', config);
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    console.log('Request Headers:', config.headers);
    return config;
})

export default api;