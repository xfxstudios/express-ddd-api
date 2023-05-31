import mongoose,{Schema,Document} from 'mongoose';
import {ErrorMongoMessages} from '../services/MongoDbEnums';
import {CustomError} from '../../error/custom-error';
import {HttpErrorCode,SystemError} from '../services/Enums';

export type RoleType={
  _id: string
  name: string
  description: string
}

interface IRoleModel extends Document {
  _id: string
  name: string
  description: string
}

const RoleSchema=new Schema<IRoleModel>({
  _id: {type: String,require: true,unique: true,index: true},
  name: {type: String,require: true},
  description: {type: String,require: true},
},{
  _id: false,
  timestamps: true
})

RoleSchema.post('save',(error,doc,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.CONFLICT))
  } else {
    next()
  }
})

RoleSchema.post('update',(error,res,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.NOT_MODIFIED))
  } else {
    next()
  }
})

const RoleModel=mongoose.model<IRoleModel>('role',RoleSchema)

export default RoleModel