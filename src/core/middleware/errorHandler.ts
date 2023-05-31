import {Request,Response,NextFunction} from 'express';
import {ErrorCodes} from '../shared/services/Enums';
import {_servLog,_servResponse} from '../shared/dependencies';
export const erroHandler=(error: Error,req: Request,res: Response,next: NextFunction) => {
  const _error=_servResponse.response({
    error: true,
    code: ErrorCodes.GENERAL_ERROR,
    message: error.message,
    flow: "Middleware error",
    errors: error
  })
  _servLog.setError(`[ERROR HANDLER]: ${error.message}`,{body: req.body,params: req.params,header: req.headers,path: req.path})
  res.status(500).json(_error)
}