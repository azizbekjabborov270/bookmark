import axios from "axios";

const defaultOptions = {
    // baseURL: "http://localhost:8085",
    baseURL: "https://reqres.in",
    headers: {
        'Content-Type': 'application/json',
        "x-api-key": "reqres-free-v1"
    },
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem(token);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default axiosInstance;

// export const url = "http://localhost:8085"
export const url = "https://reqres.in"
