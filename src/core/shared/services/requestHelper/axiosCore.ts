import {HttpError} from '../../../error';
import {_servLog} from '../../dependencies';
import { HttpErrorCode, HttpErrorMessage } from '../Enums';
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


axiosCore.interceptors.response.use(
    (response) => {
        if(process.env.SHOW_LOGS=='true') {
            _servLog.setDebug('[ API EXTERNAL RESPONSE >>> ]',{status: response.status,data: response.data})
        }
        return response
    }, async (error:any) => {
        if(error.response){
            if(process.env.SHOW_LOGS=='true') {
                _servLog.setError('[ API EXTERNAL ERROR >>> ]',{status: error.response.status,data: error.response.data})
            }
            throw new HttpError(HttpErrorMessage[error.response.status],2000, error.response.status)
        }
        if(error.request){
            if(process.env.SHOW_LOGS=='true') {
                _servLog.setError('[ API EXTERNAL ERROR >>> ]',{status: HttpErrorCode[error.code]??500,data: {message:error.message}})
            }
            throw new HttpError(HttpErrorMessage[HttpErrorCode[error.code]],2000, HttpErrorCode[error.code]??500)
        }  
    }
);