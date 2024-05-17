import AppUserModel from '../../../../core/shared/models/AppUserModel';
import RoleModel from '../../../../core/shared/models/RoleModel';
import {Account} from '../../domain/entities/Account.entitie';
import { ImoduloDemoRepository } from '../../domain/repositories/imoduloDemo.repository';

const _models = {
  "role":RoleModel,
  "appuser":AppUserModel
}

export class ModuloDemoRepository implements ImoduloDemoRepository {
  public async update(model:string, filter:object, data:object): Promise<void> {
    return new Promise((resolve, reject) => {
      _models[model??'role'].findOneAndUpdate(filter, data, {new:true})
      .then((doc:any) => resolve(doc))
      .catch((e) => reject(e))
    })
  }

  public async delete(model:string, filter:object): Promise<void> {
    return new Promise((resolve, reject) => {
      _models[model??"role"].deleteMany(filter)
      .then((data:any) => resolve(data))
      .catch((e) => reject(e))
    })
  }

  public async get(model:string, filter:object): Promise<any> {
    return new Promise((resolve) => {
      _models[model??"role"].findOne(filter)
      .then((docs:any) => {
        resolve(docs)
      })
    })
  }

  public async getAll(model:string, filter:object={}): Promise<any> {
    return new Promise((resolve) => {
      _models[model??"role"].find(filter)
      .then((docs:any) => {
        resolve(docs)
      })
    })
  }

  public async save(account:Account): Promise<Account> {
    return new Promise((resolve) => {
      resolve(account)
    })
  }

  //Custom method
  public async getUsersWithRoles(): Promise<any> {
    return new Promise((resolve, reject) => {
      _models['appuser'].find()
      .populate({
        path: 'rol',
        select: '_id name permissions',
        populate: {
          path: 'permissions',
          select: '_id name path'
        }
      })
      .select('-address -updatedAt')
      .then((list:any) => {
        resolve(list)
      })
      .catch((e) => reject(e))
    })
  }
}