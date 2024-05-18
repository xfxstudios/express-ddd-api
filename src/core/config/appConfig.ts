export const config: any={
    apiPrefix: '/api/v1/',
    usingMongo: process.env.USING_MONGO??true,
    usingMysql: process.env.USING_MYSQL??false,
    enableApyKey: process.env.API_ENABLE??false,
    graphqlEnabled:process.env.GRAPHQL_ENABLE??false,
    appStage: 'default',
    apiKey: process.env.APIKEY,
    developEnvironments:['develop','dev','qa','local'],
    productionEnvironments:['production','staging'],
    jwt: {
        jwtKey: process.env.TOKEN_KEY,
        jwtExp: process.env.TOKEN_EXP_TIME
    }
}
