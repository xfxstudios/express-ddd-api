import path from 'path';

const routesPath=path.resolve(__dirname,'../../application')+`/routes/*.js`;
const swaggerRoutes=path.resolve(__dirname,'./swagger_routes')+`/*.yml`;
//const swaggerRoutes=path.resolve(__dirname,'../../app/authentication/swagger_routes')+`/*.yml`;
const swaggerDefinitions=path.resolve(__dirname,'./swagger_definitions')+`/*.yml`;


const swaggerDef={
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Sube App API',
            version: '0.1.0',
        },
        components: {
            parameters: {
                idSession: {
                    name: 'idSession',
                    in: 'header',
                    required: true,
                    type: 'string',
                    default: 'swagger-api-idsession'
                }
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: 'header',
                    name: "api-key"
                }
            }
        },
        security: [{ApiKeyAuth: []}],
        servers: [
            {
                url: "http://{server}:{port}/{prefix}",
                description: 'Local Development server',
                variables: {
                    server: {
                        enum: ["localhost","qa.localhost","stage.localhost"],
                        default: "localhost"
                    },
                    port: {
                        enum: ["3001","3002","3010"],
                        default: "3001"
                    },
                    prefix: {
                        enum: ["api","v1","v2"],
                        default: "api"
                    }
                }
            },
            {
                url: "https://wrapper.bqb.{env}.goiar.com/",
                description: 'Remote Dev server',
                variables: {
                    env: {
                        enum: ["dev","qa"],
                        default: 'dev'
                    }
                }
            }
        ]
    },
    apis: [swaggerRoutes,swaggerDefinitions]
}

const _swaggerOptions={
    customCssUrl: '/css/swagger.css',
    customSiteTitle: "Sube API Docu",
    customfavIcon: "/images/docu-icon.png"
}

export {
    swaggerDef,
    _swaggerOptions
}
