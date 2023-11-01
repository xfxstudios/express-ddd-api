import mongoose from "mongoose";
import {_servLog} from "../dependencies";
import {DatabaseError} from "../../error";

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
        tlsAllowInvalidCertificates: true,
        directConnection: true,
        authSource: 'admin',
        serverSelectionTimeoutMS:10000
    }

    mongoose.connection.on('connected', () =>{})
    mongoose.connection.on('error', (error:any) =>{})


    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(_uri,_options)
        return true;
    } catch(err) {
        await _servLog.setError("Mongo Connection Fail",err)
        throw new DatabaseError(err.message, err.code, 500)
    }
}



////////////////////////////////////////
///////// MYSQL DB CONECTION ///////////
////////////////////////////////////////
