import HYRequest from "./request";
import {BASE_URL,TIME_OUT} from "./config";

const hyRequest = new HYRequest({
    baseURL:BASE_URL,
    timeout:TIME_OUT
});


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

export default hyRequest;