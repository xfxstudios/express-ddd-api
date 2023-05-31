import mongoose,{Schema,Document} from 'mongoose';
import {ErrorMongoMessages} from '../services/MongoDbEnums';
import {v4 as uuidv4} from 'uuid'
import {CustomError} from '../../error/custom-error';
import { HttpErrorCode, SystemError } from '../services/Enums';

export type AppUserType={
  _id: string
  username: string
  password: string
  firstName: string
  lastName: string
  occupation: string
  active: boolean
  rol: string[]
}

interface IAppUserModel extends Document {
  _id: string
  username: string
  password: string
  firstName: string
  lastName: string
  occupation: string
  active: boolean
  rol: string[]
}

const AppUserSchema=new Schema<IAppUserModel>({
  _id: {type: String,require: true,unique: true,index: true,defaultValue: uuidv4()},
  username: {type: String,require: true},
  password: {type: String,require: true},
  firstName: {type: String,require: true},
  lastName: {type: String,require: true},
  occupation: {type: String,require: true},
  active: {type: Schema.Types.Boolean,require: true,devaultValue: true},
  rol: [{type: String,ref: 'role'}],
},{
  _id: false,
  timestamps: true
})

AppUserSchema.post('save',(error,doc,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.CONFLICT))
  } else {
    next()
  }
})

AppUserSchema.post('update',(error,res,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.NOT_MODIFIED))
  } else {
    next()
  }
})

const AppUserModel=mongoose.model<IAppUserModel>('appuser',AppUserSchema)

export default AppUserModel