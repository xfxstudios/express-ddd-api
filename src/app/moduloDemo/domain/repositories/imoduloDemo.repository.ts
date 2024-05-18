import { DatabaseContracts } from '../../../../core/contracts/generalDbContracts';

interface ImoduloDemoRepository extends DatabaseContracts {
  getUsersWithRoles():Promise<any>
}

export { ImoduloDemoRepository }