import {HttpError} from "../../../error";
import {_servLog} from "../../dependencies";
import {axiosCore} from "./axiosCore";
import { IRequestService } from '../../../contracts/services_contracts/RequestService.contract';

const qs=require('qs');


/**
 * Setters
 * @setUrl
 * @setHeaders
 * @setBody
 * @setQuery
 * 
 * Methods
 * @doRequest //post | put | patch
 * @doGet
 * @doDelete
 */
export class RequestService implements IRequestService {
    protected provider: string

    protected url: any|string
    protected headers: any
    protected body: any
    protected method: boolean|string
    protected query: any


    constructor() {
        this.provider="axios"
        this.url=false
        this.method=false
        this.headers={"Contect-Type": "application/json"}
        this.body={}
        this.query=false
    }

    //Setters ||===========================>
    /**
     * 
     * @param _provider 
     * @returns 
     */
    setProvider(_provider: string) {
        this.provider=_provider
        return this
    }

    setMethod(_method:"post"|"POST"|"put"|"PUT"|"patch"|"PATCH"|"delete"|"DELETE"|"get"|"GET"|"head"|"HEAD"|"options"|"OPTIONS"){
        this.method = _method
        return this
    }

    /**
     * 
     * @param _url 
     * @returns 
     */
    setUrl(_url: string) {
        this.url=_url
        return this
    }

    /**
     * 
     * @param _headers 
     * @returns 
     * Example:
     * {key1:value1}
     * [{key1:value1},{key2:value2},{key3:value3,key4:value4}]
     */
    setHeaders(_headers: object) {
        if(typeof _headers!='object') {
            return this
        } else {
            if(Array.isArray(_headers)) {
                let out={}
                _headers.forEach((v,i) => {
                    if(typeof v=='object') {
                        Object.keys(v).forEach((t) => out[t]=_headers[i][t])
                    }
                })
                //this.headers = {...this.headers, ...out}
                this.headers=out
            } else {
                //this.headers = {...this.headers, ..._headers}
                this.headers=_headers
            }
            return this
        }
    }

    /**
     * 
     * @param _body 
     * @param _qa // true=name=hehe&age=10 false="{"a":"hehe","age":10}"
     * @returns 
     */
    setBody(_body: any,_qs: boolean=false) {
        this.body=(_qs)? qs.stringify(_body):JSON.stringify(_body)
        return this
    }

    /**
     * 
     * @param _query 
     * @returns 
     */
    setQuery(_query: any) {
        this.query=`?${new URLSearchParams(_query).toString()}`
        return this
    }
    //end Setters <=======================

    //Providers ||===========================>
    //Axios
    private _axiosProvider(config: any) {
        return new Promise((resolve,reject) => {
            axiosCore.request(config)
                .then((response: any) => resolve(response))
                .catch((e: any) => {
                    if(process.env.SHOW_LOGS=='true') {
                        _servLog.setError(`ERROR ${this.provider.toUpperCase()} | ${e.message}`,e)
                    }
                    reject(e)
                })
        })
    }

    private _execute(config: any) {

        if(!config.url) {throw new Error("Not url detected")}

        return this._axiosProvider(config)

    }

    async doRequest() {
        return new Promise((resolve,reject) => {
            if(!this.method){
                throw new HttpError("Disculpe, ha ocurrido un error, por favor, intente de nuevo mas tarde",2000,400)
            }
            const _config={
                method: this.method,
                headers: this.headers,
                url: (this.query)? this.url+this.query:this.url
            }
            if(this.body){
                _config['data'] = this.body
            }
            this._execute(_config)
                .then((info) => resolve(info))
                .catch((err) => {
                    reject(err)
                })
        })
    }//

}//