import cors from 'cors'
import express,{Application} from 'express'

import {IncommingLog} from '../middleware/incommingLog'
import {mongoConection} from '../shared/services/ConexionService';
import {errorNotFoundHandler} from '../middleware/errorNotFoundHandler';
import {erroHandler} from '../middleware/errorHandler';
import {_servGeneral,_servLog} from '../shared/dependencies';
import { Listr } from 'listr2'
import { config } from './../config/appConfig';
import {swaggerDef} from '../config/swagger';
const logger = require('morgan');
const path=require('path');
const fs=require('fs');

const swaggerJsdoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')

console.time('Tiempo de carga de la API');

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

        const tasks = new Listr<any>([
                {
                    title: 'Connecting to Database',
                    task: async (): Promise<void> => this.dbConection()
                },
                {
                    title: 'Loading Middlewares',
                    task: async (): Promise<void> =>  this.middleware()
                },
                {
                    title: 'Loading Routes',
                    task: async (): Promise<void> =>  this.routes()
                },
                {
                    title: 'Printings Routes',
                    task: async (): Promise<void> =>  this.printRoutes()
                },
                {
                    title: 'Loading Server',
                    task: async (): Promise<void> =>  this.listener()
                },
        ],{exitOnError: true})

        await tasks.run()
    }


    /**
     * Middlewares
    */
    async middleware() {
        this.app.use(cors())
        this.app.set('view engine', 'pug')
        this.app.set('views', path.resolve(fs.existsSync('dist/src/views')?'dist/src/views':'src/views'))
        this.app.use(logger('dev'));
        this.app.use(express.json({limit: '50mb'}))
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(IncommingLog)
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup( swaggerJsdoc(swaggerDef) ));
    }


    /**
     * Database conection
     */
    async dbConection() {
        if(config.usingMongo)
            await mongoConection()
        //if(config.usingMysql)
        //    await mongoConection()
    }


    /**
     * Routes
     */
    routes() {
        const _app=this.app
        const _prefix=this.prefix
        const _modules=path.resolve(fs.existsSync('dist/src/app/')?'dist/src/app/':'src/app/')
        const _moduleRoutes=path.resolve(`${_modules}/:?/routes/`)

        const _folders=fs.readdirSync(_modules);
        _folders.forEach((item) => {
            const _actual=path.resolve(_servGeneral._replace(_moduleRoutes,[item]))
            const _files=fs.readdirSync(_actual);
            _files.forEach((file) => {
                _app.use(_prefix,require(`${_actual}/${file}`))
            })
        })
        _app.use('/', (req, res) => res.render('index'))
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
        console.timeEnd('Tiempo de carga de la API');
        this.app.listen(this.port,() => {
            console.log(`Listening on http://localhost:${this.port}`);
        })
    }

}
