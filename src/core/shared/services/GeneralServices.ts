
import qs from 'qs'
import bcrypt from 'bcrypt'
const expressListRoutes=require('express-list-routes');
import {config} from '../../config/appConfig';
import {validate} from 'class-validator';
const jwt=require('jsonwebtoken');

const fs=require('fs')
const https=require('https');

export class GeneralService {

    private saltRounds: number

    constructor() {
        this.saltRounds=10;
    }

    /**
     * 
     * @param pwd 
     * @returns 
     */
    async encyptData(pwd: string): Promise<string> {
        let hashedParam=bcrypt.hashSync(pwd,this.saltRounds)
        return hashedParam;
    }


    /**
     * 
     * @param pwd 
     * @returns 
     */
    async checkHash(dbPwd: string,reqPwd: string): Promise<boolean> {
        let result=await bcrypt.compareSync(reqPwd,dbPwd);
        return result;
    }


    /**
     * 
     * @param pwd 
     * @returns 
     */
    async formatQueryRespons(query: any,avoitParams: object|null) {

        query.map((item: any) => {
            console.log(item)
        })

    }


    /**
     * Parsea los datos de las respuesta del ORM Sequelize
     * @param ORM_Response 
     * @returns Object
     */
    async parseOrmResponse(ORM_Response: any): Promise<any> {
        const response=JSON.parse(JSON.stringify(ORM_Response));
        return response
    }


    /**
     * 
     * @param dbPwd 
     * @param paramPwd 
     * @returns
     */
    async comparePwd(dbPwd: string,paramPwd: string): Promise<boolean> {
        const result=await bcrypt.compareSync(dbPwd,paramPwd)
        return result
    }


    /**
     * 
     * @param str 
     * @returns 
     */
    stringToLowCase(str: string): string {
        return str.toLowerCase();
    }


    /**
     * 
     * @param str 
     * @returns 
     */
    trimStr(str: any) {
        return str.trim();
    }


    /**
     * 
     * @returns 
     */
    apiKeyGenerator() {

        const hash=process.env.APIkEY_HASH!
        const _data=Buffer.from(hash,'utf-8');
        return _data.toString('base64')

    }


    /**
     * 
     * @param username 
     * @param password 
     * @returns 
     */
    getBody(username: string='',password: string='') {

        const url=`${config.bqbApi.url}MarketApi/oauth/token`
        const headers=config.bqbApi.headers
        const grant_type='password';
        let payload

        if(username!==''&&password!=='') { // WEB PAYLOAD

            payload={
                grant_type,
                username,
                password,
                validateToken: 1
            }

        } else { // APP PAYLOAD

            payload={
                grant_type,
                ...config.bqbApi.payload,
                validateToken: 1
            }

        }

        const httpConfig={
            method: "post",
            url,
            headers,
            auth: {
                username: config.bqbApi.auth.clientId,
                password: config.bqbApi.auth.clientSecret
            },
            data: qs.stringify(payload)
        }

        return httpConfig

    }


    downloadQr=async (url: any,img='algo.png') => {

        return new Promise((resolve,reject) => {
            const rr='./public/images/'+img
            const file=fs.createWriteStream('./public/images/'+img);

            https.get(`${config.bqbApi.url}/${url}`,(response: any) => {
                response.pipe(file);

                file.on("finish",() => {
                    file.close();

                    if(fs.existsSync(rr)) {
                        resolve(true);
                    } else {
                        reject({message: "Error al guardar el archivo"})
                    }
                });

                file.on("error",(e: any) => {
                    reject(e)
                })

            });

        })

    }

    async printRoutes(app: any) {
        expressListRoutes(app,{prefix: config.prefix})
    }

    async _validateBody(data: any) {
        const _validate=await validate(data);
        let _out=[]
        if(_validate.length>0) {
            _out=_validate.map((item: any) => {
                return {
                    property: item.property,
                    errors: item.constraints
                }
            })
        }
        return _out
    }

    async generateOtpCode(start=0,end=999999): Promise<any> {

        return new Promise((resolve,reject) => {
            try {
                const verificationCode=Math.floor(100000+Math.random()*900000).toString()
                resolve(verificationCode)
            } catch(e) {
                reject(false)
            }
        })

    }

    /**
     * 
     * @param txt 
     * @param values[] 
     * Example: _replace("Username :? is status :?", ["jhonDoe","active"])
     * @returns 
     */
    _replace(txt: string,values: any[]) {
        let _out=txt
        values.forEach((item) => {
            _out=_out.replace(":?",item)
        })
        return _out
    }


    generateAccount(): string {
        let accountA=Date.now()
        let result='';
        const digits='0123456789'
        for(let i=0;i<4;i++) {
            result+=digits.charAt(Math.floor(Math.random()*digits.length));
        }
        return `${result}${accountA}`
    }

    generateRandomString(cadena: string): string {
        let result='';
        const charactersA='0123456789'
        const characters=cadena+charactersA
        for(let i=0;i<6;i++) {
            result+=characters.charAt(Math.floor(Math.random()*characters.length));
        }
        return result;
    }


    async tokenDecode(token: string) {
        return new Promise((resolve,reject) => {
            try {
                const _decoded=jwt.decode(token,{complete: true});
                resolve(_decoded)
            } catch(error) {
                reject(error)
            }
        })

    }




}
