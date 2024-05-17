import {Account} from '../../domain/entities/Account.entitie';
import { ImoduloDemoRepository } from '../../domain/repositories/imoduloDemo.repository';

export class ModuloDemoRepository implements ImoduloDemoRepository {
  public async update(data: any): Promise<void> {
    console.log(data)
    throw new Error('Method not implemented.');
  }
  public async delete(data: any): Promise<void> {
    console.log(data)
    throw new Error('Method not implemented.');
  }
  public async get(data: any): Promise<any> {
    console.log(data)
    throw new Error('Method not implemented.');
  }
  public async getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async save(account:Account): Promise<Account> {
    return new Promise((resolve) => {
      resolve(account)
    })
  }
}