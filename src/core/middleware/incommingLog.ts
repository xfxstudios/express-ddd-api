import {Request,Response,NextFunction} from 'express'
import {_servLog} from '../shared/dependencies'


export const IncommingLog=(req: Request,res: Response,next: NextFunction) => {
  _servLog.setDebug('[Middleware][>> INCOMMING REQUEST]',{body: req.body,params: req.params,header: req.headers,path: req.path})
  next()
}