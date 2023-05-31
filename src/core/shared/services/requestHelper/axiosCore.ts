import {_servLog} from '../../dependencies';
const axios=require("axios");

const TIMEOUT_IN_MILLIS=60000;

export const axiosCore=axios.create({
    timeout: TIMEOUT_IN_MILLIS,
}); // end of axiosCore

axiosCore.interceptors.request.use((config: any) => {
    if(process.env.SHOW_LOGS=='true') {
        _servLog.setDebug('[ API EXTERNAL REQUEST >>> ]',config)
    }
    return config
})


// Interceptor used to return custom error when request timed out
axiosCore.interceptors.response.use(
    (response) => {
        if(process.env.SHOW_LOGS=='true') {
            _servLog.setDebug('[ API EXTERNAL RESPONSE >>> ]',{status: response.status,data: response.data})
        }
        return response
    }
); // end of axiosCore.interceptors.response.use timeout