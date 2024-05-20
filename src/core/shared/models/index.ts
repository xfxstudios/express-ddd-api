import {Model} from 'mongoose';
import AppUserModel from './AppUserModel';
import DocumentTypeModel from './DocumentTypeModel';
import PaymentTypeModel from './PaymentTypeModel';
import TokenModel from './TokenModel';
import mNewRoleModel from './NewRoleModel';

interface iModels {
  'user': typeof AppUserModel,
  'document':typeof DocumentTypeModel,
  'payment':typeof PaymentTypeModel,
  'role':typeof mNewRoleModel,
  'token':typeof TokenModel,
}

const models:iModels = {
  'user': AppUserModel,
  'document':DocumentTypeModel,
  'payment':PaymentTypeModel,
  'role':mNewRoleModel,
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