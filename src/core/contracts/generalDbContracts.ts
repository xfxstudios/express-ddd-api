import {DbModelsEnum} from "../shared/models";

export interface DatabaseContracts {
  save(model:DbModelsEnum, data: any): Promise<any>;
  update(model:DbModelsEnum, filter:object, data:object): Promise<any>;
  delete(model:DbModelsEnum, filter:object): Promise<any>;
  get(model:DbModelsEnum, filter:object): Promise<any>;
  getAll(model:DbModelsEnum, filter:object): Promise<any>;
}