import {NextFunction,Request,Response} from "express";
import {config} from "../config/appConfig";
import {_servLog,_servResponse} from "../shared/dependencies";
import {AuthenticationError} from "../error";
import {ErrorCodes,HttpErrorCode} from "../shared/services/Enums";
import ErrorMessages from '../shared/services/Enums';

const authentication=(req: Request,res: Response,next: NextFunction) => {

    try {
        const apiKey=req.get("x-api-key");
        if(!apiKey||apiKey!=config.apiKey) throw new AuthenticationError(ErrorMessages[ErrorCodes.INVALID_API_KEY],ErrorCodes.FORBIDEN_EXCEPTION,HttpErrorCode.UNAUTHORIZED)
        next()
    } catch(e) {
        res.status(e.httpcode).json(_servResponse.response({
            error: true,
            code: e.code,
            http: e.httpcode,
            flow: 'api-key Validation Middleware',
            message: e.message
        }))

    }
};

export default authentication
