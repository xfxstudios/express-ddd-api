import mongoose from "mongoose";
import {_servLog} from "../dependencies";

////////////////////////////////////////
///////// MONGO DB CONECTION ///////////
////////////////////////////////////////

export const mongoConection=async () => {
    let _uri: string=""
    let _options: any={}

    _uri=`mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`
    _options={
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retrywrites: false,
        ssl: false,
        sslValidate: false,
        directConnection: true,
        authSource: 'admin'
    }

    try {
        await mongoose.connect(_uri,_options)

        _servLog.setSuccess("MongoDB Connection Set")
        return "MongoDB Connection Set"
    } catch(err) {
        _servLog.setError("Mongo Connection Fail",err)
        throw new Error(err.message)
    }
}



////////////////////////////////////////
///////// MYSQL DB CONECTION ///////////
////////////////////////////////////////
