import cors from 'cors'
import express,{Application} from 'express'
import {config} from '../config/appConfig'
import {IncommingLog} from '../middleware/incommingLog'
import {mongoConection} from '../shared/services/ConexionService';
import {errorNotFoundHandler} from '../middleware/errorNotFoundHandler';
import {erroHandler} from '../middleware/errorHandler';
import {_servGeneral,_servLog} from '../shared/dependencies';
const path=require('path');
const fs=require('fs');

const swaggerJsdoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')

export default class Server {

    protected app: Application
    protected prefix: string
    protected port: any

    constructor() {
        this.port=process.env.PORT
        this.prefix=config.apiPrefix
        this.app=express()
        this._init()
        
    }
    
    async _init(){
        await _servLog.setSteep({message: "Connecting to database...", number:1})
        await this.dbConection()
        await _servLog.setSteep({message: "Loading Middlewares...", number:2})
        await this.middleware()
        await _servLog.setSteep({message: "Loading routes...", number:3})
        this.routes()
        this.printRoutes()
        await _servLog.setSteep({message: "Loading server...", number:4})
        this.listener()
        //await this.printRout()
    }


    /**
     * Middlewares
    */
    async middleware() {
        this.app.use(cors())
        this.app.use(express.json({limit: '50mb'}))
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(IncommingLog)
    }


    /**
     * Database conection
     */
    async dbConection() {
        await mongoConection()
    }


    /**
     * Routes
     */
    routes() {
        const _app=this.app
        const _prefix=this.prefix
        const _modules=path.resolve(fs.existsSync('dist/src/app/')? 'dist/src/app/':'src/app/')
        const _moduleRoutes=path.resolve(`${_modules}/:?/routes/`)

        const _folders=fs.readdirSync(_modules);
        _folders.forEach((item) => {
            const _actual=path.resolve(_servGeneral._replace(_moduleRoutes,[item]))
            const _files=fs.readdirSync(_actual);
            _files.forEach((file) => {
                _app.use(_prefix,require(`${_actual}/${file}`))
            })
        })
        _app.use(errorNotFoundHandler)
        _app.use(erroHandler)
    }

    async printRoutes() {
        if(config.developEnvironments.includes(process.env.APP_ENV)) {
            await _servGeneral.printRoutes(this.app)
        }
    }

    /**
     * Listener
     */
    listener() {
        this.app.listen(this.port,() => _servLog.setSuccess(`Server listen on port ${this.port}`))
    }

}
