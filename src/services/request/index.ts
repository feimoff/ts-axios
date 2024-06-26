import axios from "axios";
import type { AxiosInstance,AxiosRequestConfig } from "axios";

class HYRequest{
    instance: AxiosInstance;

    constructor(config: AxiosRequestConfig){
        this.instance = axios.create(config)
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