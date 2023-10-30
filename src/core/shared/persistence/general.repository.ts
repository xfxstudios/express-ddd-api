import {IGeneralRepository} from "../repositories/igeneral.repository";

export class GeneralRepository implements IGeneralRepository {
  save<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  delete<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  findOne<T>(data: T): T {
    throw new Error("Method not implemented.");
  }
  findAll<T>(data: T[]): T[] {
    throw new Error("Method not implemented.");
  }
  update<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  updateAll<T>(data: T[]): void {
    throw new Error("Method not implemented.");
  }
}