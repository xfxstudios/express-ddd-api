import mongoose,{Schema,Document} from 'mongoose';
import {ErrorMongoMessages} from '../services/MongoDbEnums';
import {CustomError} from '../../error/custom-error';
import {HttpErrorCode,SystemError} from '../services/Enums';

export type DocumentTypeType={
  _id: string
  document_name: string
}

interface IDocumentTypeModel extends Document {
  _id: string
  document_name: string
}

const DocumentTypeSchema=new Schema<IDocumentTypeModel>({
  _id: {type: String,require: true},
  document_name: {type: String,require: true},
},{
  _id: false,
  timestamps: true
})

DocumentTypeSchema.post('save',(error,doc,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.CONFLICT))
  } else {
    next()
  }
})

DocumentTypeSchema.post('update',(error,res,next) => {
  if(error) {
    next(new CustomError(ErrorMongoMessages[error.code],SystemError.DATABASEERROR,error.code,HttpErrorCode.NOT_MODIFIED))
  } else {
    next()
  }
})

const DocumentTypeModel=mongoose.model<IDocumentTypeModel>('documenttype',DocumentTypeSchema)

export default DocumentTypeModel