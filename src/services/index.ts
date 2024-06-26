import HYRequest from "./request";
import {BASE_URL,TIME_OUT} from "./config";

// 针对全局拦截器
const hyRequest = new HYRequest({
    baseURL:BASE_URL,
    timeout:TIME_OUT
});

// 针对实例拦截器
const hyRequest2 = new HYRequest({
    baseURL:BASE_URL,
    // 多传递的拦截函数
    interceptors:{
        requestSuccessFn(config) {
            return config;
        },
        requestFailFn(err) {
            return err;
        },
        responseSuccessFn(res) {
            return res;
        },
        responseFailFn(err) {
            return err;
        },
    }
});

// 针对单次请求拦截器
hyRequest.get({
    url:"xxx",
    interceptors:{
        requestSuccessFn:(config)=>{
            return config
        },
        responseSuccessFn:(res) => {
            return res
        }
    }
})

export default hyRequest;