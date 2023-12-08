export const config: any={
    apiPrefix: '/api/v1/',
    usingMongo: process.env.USING_MONGO??false,
    usingMysql: process.env.USING_MYSQL??false,
    enableApyKey: process.env.API_ENABLE??true,
    graphqlEnabled:process.env.GRAPHQL_ENABLE??true,
    appStage: 'default',
    apiKey: process.env.APIKEY,
    developEnvironments:['develop','dev','qa','local'],
    productionEnvironments:['production','staging'],
    jwt: {
        jwtKey: process.env.TOKEN_KEY,
        jwtExp: process.env.TOKEN_EXP_TIME
    }
}
