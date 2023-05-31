export const config: any={
    apiPrefix: '/api/',
    dbDialect: 'mongo',
    enableApyKey: true,
    appStage: 'default',
    apiKey: process.env.APIKEY,
    jwt: {
        jwtKey: process.env.TOKEN_KEY,
        jwtExp: process.env.TOKEN_EXP_TIME
    }
}
