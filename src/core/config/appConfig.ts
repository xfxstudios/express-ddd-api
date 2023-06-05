export const config: any={
    apiPrefix: '/api/v1/',
    dbDialect: 'mongo',
    enableApyKey: true,
    appStage: 'default',
    apiKey: process.env.APIKEY,
    developEnvironments:['develop','dev','qa','local'],
    productionEnvironments:['production','staging'],
    jwt: {
        jwtKey: process.env.TOKEN_KEY,
        jwtExp: process.env.TOKEN_EXP_TIME
    }
}
