export interface DatabaseContracts {
  save(data: any): Promise<any>;
  update(data: any): Promise<any>;
  delete(data: any): Promise<any>;
  get(data: any): Promise<any>;
  getAll(): Promise<any>;
}