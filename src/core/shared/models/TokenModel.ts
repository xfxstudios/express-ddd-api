import mongoose,{Schema,Document} from 'mongoose';
import {ErrorMongoMessages} from '../services/MongoDbEnums';
import {HttpErrorCode,SystemError} from '../services/Enums';
import {CustomError} from '../../error/custom-error';

export type TokenType={
  username: string
  AccessToken: string
  AccessTokenExpires_in: number
  TokenType: string
  RefreshToken: string
  RefreshTokenExpiresIn: number
}

interface ITokenModel extends Document {
  username: string|object
  AccessToken: string
  AccessTokenExpires_in: number
  TokenType: string
  RefreshToken: string
  RefreshTokenExpiresIn: number
}

const TokenSchema=new Schema<ITokenModel>({
  username: {type: String,require: true},
  AccessToken: {type: String,require: true},
  AccessTokenExpires_in: {type: Number,require: true},
  TokenType: {type: String,require: true},
  RefreshToken: {type: String,require: true},
  RefreshTokenExpiresIn: {type: Number,require: true},
},{
  timestamps: true
})

TokenSchema.post('save',(error,doc,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.CONFLICT))
  } else {
    next()
  }
})

TokenSchema.post('update',(error,res,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.NOT_MODIFIED))
  } else {
    next()
  }
})

const TokenModel=mongoose.model<ITokenModel>('token',TokenSchema)

export default TokenModel