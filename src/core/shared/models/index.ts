import {Model} from 'mongoose';
import AppUserModel from './AppUserModel';
import DocumentTypeModel from './DocumentTypeModel';
import PaymentTypeModel from './PaymentTypeModel';
import RoleModel from './RoleModel';
import TokenModel from './TokenModel';

const models = {
  'user':AppUserModel,
  'document':DocumentTypeModel,
  'payment':PaymentTypeModel,
  'role':RoleModel,
  'token':TokenModel,
}


export enum DbModelsEnum {
  USER='user',
  DOCUMENT='document',
  PAYMENT='payment',
  ROLE='role',
  TOKEN='token',
}

export const getModel = (model:DbModelsEnum): Model<any>  => {
  return models[model];
}