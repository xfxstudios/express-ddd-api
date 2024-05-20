import {DbModelsEnum, getModel} from '../../../../core/shared/models';
import {RoleEntity} from '../../domain/entities/Role.entity';
import { ImoduloDemoRepository } from '../../domain/repositories/imoduloDemo.repository';


export class ModuloDemoRepository implements ImoduloDemoRepository {
  public async update(model:DbModelsEnum, filter:object, data:object): Promise<void> {
    return new Promise((resolve, reject) => {
      getModel(model).findOneAndUpdate(filter, data, {new:true})
      .then((doc:any) => resolve(doc))
      .catch((e) => reject(e))
    })
  }

  public async delete(model:DbModelsEnum, filter:object): Promise<void> {
    return new Promise((resolve, reject) => {
      getModel(model).deleteMany(filter)
      .then((data:any) => resolve(data))
      .catch((e) => reject(e))
    })
  }

  public async get(model:DbModelsEnum, filter:object): Promise<any> {
    return new Promise((resolve) => {
      getModel(model).findOne(filter)
      .then((docs:any) => {
        resolve(docs)
      })
    })
  }

  public async getAll(model:DbModelsEnum, filter:object={}): Promise<any> {
    return new Promise((resolve) => {
      getModel(model).find(filter)
      .then((docs:any) => {
        resolve(docs)
      })
    })
  }

  public async save(model:DbModelsEnum, data:RoleEntity): Promise<RoleEntity|any> {
    return new Promise((resolve, reject) => {
      getModel(model).create(data)
      .then((doc:any) => {
        resolve(doc)
      })
      .catch((e) => reject(e))
    })
  }

  //Custom method
  public async getUsersWithRoles(): Promise<any> {
    return new Promise((resolve, reject) => {
      getModel(DbModelsEnum.USER).find()
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