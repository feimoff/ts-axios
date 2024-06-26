import axios from "axios";
import type { AxiosInstance,AxiosRequestConfig } from "axios";

class HYRequest{
    instance: AxiosInstance;

    constructor(config: AxiosRequestConfig){
        this.instance = axios.create(config)
        // 给每个instance实例都添加拦截器（全局拦截器）
        this.instance.interceptors.request.use(
            (config) => {
                // loading/token
                return config
            },
            (err) => {
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                return res.data
            },
            (err) => {
                return err
            }
        )
    }

    request(config:AxiosRequestConfig){
        return this.instance.request(config)
    }

    get(config:AxiosRequestConfig){
        return this.request({...config,method:"GET"})
    }


    post(config:AxiosRequestConfig){
        return this.request({...config,method:"POST"})
    }
}

export default HYRequest;