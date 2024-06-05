import cors from 'cors'
import express,{Application} from 'express'

import {IncommingLog} from '../middleware/incommingLog'
import {mongoConection} from '../shared/services/ConexionService';
import {errorNotFoundHandler} from '../middleware/errorNotFoundHandler';
import {erroHandler} from '../middleware/errorHandler';
import {_servGeneral} from '../shared/dependencies';
import { Listr } from 'listr2'
import { config } from './../config/appConfig';
import {swaggerDef} from '../config/swagger';
import { rateLimit } from 'express-rate-limit'

const logger = require('morgan');
const path=require('path');
const fs=require('fs');


const swaggerJsdoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')

import http from 'http';

console.time('Tiempo de carga de la API');

export default class Server {

    protected app: Application
    protected prefix: string
    protected port: any
    protected httpServer: any

    constructor() {
        this.port=process.env.PORT
        this.prefix=config.apiPrefix
        this.app=express()
        this.httpServer = http.createServer(this.app);
        this._init()
        
    }
    
    async _init(){

        const _taskItems = [
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
            }
        ];

        const tasks = new Listr<any>(_taskItems,{exitOnError: true})

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

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            message: 'Too many requests from this IP, please try again after 15 minutes',
            statusCode: 429, // 429 status = Too Many Requests (RFC 6585)
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
            // store: ... , // Redis, Memcached, etc. See below.
        })

        _app.use(limiter);

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
