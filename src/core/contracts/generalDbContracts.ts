export interface DatabaseContracts {
  save(data: any): Promise<any>;
  update(model:string, filter:object, data:object): Promise<any>;
  delete(model:string, filter:object): Promise<any>;
  get(model:string, filter:object): Promise<any>;
  getAll(model:string, filter:object): Promise<any>;
}