
export interface IResponse {
    error: boolean
    code: string|number
    message?: string
    flow?: string
    data?: any
    received?: any
    errors?: any
    http?: any
}

export interface IResponseService {
    response(items:any):IResponse
}

export default class ResponseService implements IResponseService {


    response(items: any): IResponse {

        const {error,received,code,message,flow,data,errors,http}=items

        const response={
            code,
            error: error??false,
            flow,
            message
        }
        if(data) {
            response['data']=data
        }
        if(received) {
            response['received']=received
        }
        if(errors) {
            response['errors']=errors
        }
        if(http) {
            response['http']=http
        }

        return response

    }

}
