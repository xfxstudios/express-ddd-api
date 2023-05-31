import mongoose,{Schema,Document} from 'mongoose';
import {CustomError} from '../../error/custom-error';
import {ErrorMongoMessages} from '../services/MongoDbEnums';
import {HttpErrorCode,SystemError} from '../services/Enums';

interface IPaymentTypeModel extends Document {
  _id: string
  payment_name: string
  description: string
}

const PaymentTypeSchema=new Schema<IPaymentTypeModel>({
  _id: {type: String,require: true,index: true},
  payment_name: {type: String,require: true},
  description: {type: String,require: true},
},{
  _id: false,
  timestamps: true
})

PaymentTypeSchema.post('save',(error,doc,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.CONFLICT))
  } else {
    next()
  }
})

PaymentTypeSchema.post('update',(error,res,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.NOT_MODIFIED))
  } else {
    next()
  }
})

const PaymentTypeModel=mongoose.model<IPaymentTypeModel>('paymenttype',PaymentTypeSchema)

export default PaymentTypeModel