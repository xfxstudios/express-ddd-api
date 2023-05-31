import {NextFunction,Response,Request} from 'express';
import ErrorMessages,{ErrorCodes,HttpErrorCode} from '../shared/services/Enums';
import {_servJwt,_servLog,_servResponse} from '../shared/dependencies';
import TokenModel from '../shared/models/TokenModel';
import {AuthenticationError,NotFoundError} from '../error';

export const validTokenMiddleware=async (req: Request,res: Response,next: NextFunction) => {
  let _token=req.get('authorization')??false
  try {
    if(!_token) {
      throw new AuthenticationError(ErrorMessages[ErrorCodes.FORBIDEN_EXCEPTION],ErrorCodes.FORBIDEN_EXCEPTION,HttpErrorCode.UNAUTHORIZED)
    }

    _token=(_token.includes('Bearer'))? _token.split(' ')[1]:_token

    const _search=await TokenModel.findOne({AccessToken: {$eq: _token}})
    if(_search) {
      try {
        await _servJwt.validToken(_token)
        next()
      } catch(e) {
        throw new AuthenticationError(e.message,ErrorCodes.EXPIRED_TOKEN,HttpErrorCode.UNAUTHORIZED)
      }
    } else {
      throw new NotFoundError(ErrorMessages[ErrorCodes.TOKEN_NOT_FOUND],ErrorCodes.TOKEN_NOT_FOUND,HttpErrorCode.NOT_FOUND)
    }
  } catch(e) {
    _servLog.setError(`valid-token-middleware - ${e.message}`,e)
    res.status(403).json(_servResponse.response({
      error: true,
      code: e.code,
      message: e.message,
      flow: 'Token Validation Middleware'
    }))
  }

}