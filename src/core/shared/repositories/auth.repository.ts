import {AuthLoginResponseDTO} from "../../../app/authentication/application/authLogin/AuthLoginResponse.dto"
import {_servGeneral} from "../dependencies"
import AppUserModel from "../models/AppUserModel"
import ErrorMessages,{ErrorCodes,HttpErrorCode} from "../services/Enums"
import TokenModel from '../models/TokenModel';
import {NotFoundError,AuthenticationError} from "../../error"

export class AuthRepository {

  /**
   * Set User Login
   * @param username 
   * @param password 
   * @returns 
   */
  async makeLogin(username: string,password: string) {
    return new Promise((resolve,reject) => {
      AppUserModel.findOne({username})
        .then(async (user) => {
          if(!user) {
            throw new NotFoundError(ErrorMessages[ErrorCodes.INVALID_LOGIN_DATA],ErrorCodes.INVALID_LOGIN_DATA,HttpErrorCode.UNPROCESSABLE_ENTITY)
          }
          const _validPass=await _servGeneral.checkHash(user.password,password)
          if(_validPass) {
            if(!user.active) {
              throw new AuthenticationError(ErrorMessages[ErrorCodes.USER_DISABLED],ErrorCodes.USER_DISABLED,HttpErrorCode.FORBIDDEN)
            }
            const _dto=new AuthLoginResponseDTO(user)
            resolve(_dto.serialize())
          } else {
            throw new AuthenticationError(ErrorMessages[ErrorCodes.INVALID_LOGIN_DATA],ErrorCodes.INVALID_LOGIN_DATA,HttpErrorCode.UNPROCESSABLE_ENTITY)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  /**
   * Delete user session
   * @param token 
   * @returns 
   */
  async makeLogOut(token: string) {
    return new Promise((resolve,reject) => {
      TokenModel.findOne({AccessToken: token})
        .then((token) => {
          if(token) {
            token.delete()
          } else {
            throw new NotFoundError(ErrorMessages[ErrorCodes.TOKEN_NOT_FOUND],ErrorCodes.DATABASE_ERROR,HttpErrorCode.NOT_FOUND)
          }
        })
        .then((_) => resolve(true))
        .catch((e) => {
          reject(e)
        })
    })
  }

}