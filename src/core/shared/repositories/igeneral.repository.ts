
interface IGeneralRepository {
  save<T>(data:T):void;
  delete<T>(data:T):void;
  findOne<T>(data:T):T;
  findAll<T>(data:T[]):T[];
  update<T>(data:T):void;
  updateAll<T>(data:T[]):void;
}

export { IGeneralRepository }