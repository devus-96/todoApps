import axios, { AxiosHeaders, AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function HTTPClient () : AxiosInstance {
    const headers = AxiosHeaders.from({
        Accept: "application/json",
    })

    const token = getCookie('authCookies')

    if (token) {
        headers.set("Authorization", `Bearer ${token}`)
    }

    const instance = axios.create({
        headers,
        withCredentials: true,
        baseURL: "http://127.0.0.1:8000",
        timeout: 2000
    })

    instance.interceptors.request.use((config) => {
        console.info(`REQUEST (${config.url}) => `, config);
        if (!config.headers.get("Authorization")) {
            const token = getCookie('authCookies');
      
            if (token) {
              config.headers.set("Authorization", `Bearer ${token}`);
            }
          }
      
          return config;
    })

    instance.interceptors.response.use((res) =>{
        console.info(`RESPONSE (${res.config.url}) => `, res);

        return res
    })

    return instance;
} 