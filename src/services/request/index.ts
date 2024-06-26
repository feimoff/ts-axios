import axios from "axios";
import type { AxiosInstance,AxiosRequestConfig,AxiosResponse } from "axios";


interface HYRequestConfig extends AxiosRequestConfig{
    // 这里将interceptors定义的对象，拆分到了下面的接口中
    interceptors?: HYInterceptors
}

interface HYInterceptors {
    requestSuccessFn?:(config:AxiosRequestConfig) =>  AxiosRequestConfig
    requestFailFn?:(err:any) => any
    responseSuccessFn?:(res:AxiosResponse) => AxiosResponse
    responseFailFn?:(err:any)=>any
}


class HYRequest{
    instance: AxiosInstance;

    constructor(config: HYRequestConfig){
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

        // 实例拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailFn
        )
    }

    request(config:HYRequestConfig){
        // 针对单次请求的拦截
        // 在发送请求之前，判断有没有传递interceptors
        if(config.interceptors?.requestSuccessFn){
            config = config.interceptors.requestSuccessFn(config)
        }
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res=>{
                // 在响应成功，返回数据前，判断有没有多传递interceptors
                if(config.interceptors?.responseSuccessFn){
                    res = config.interceptors.responseSuccessFn(res)
                }
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    get(config:HYRequestConfig){
        return this.request({...config,method:"GET"})
    }


    post(config:HYRequestConfig){
        return this.request({...config,method:"POST"})
    }
}

export default HYRequest;