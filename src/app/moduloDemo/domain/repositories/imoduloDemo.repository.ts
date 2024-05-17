import { Account } from '../entities/Account.entitie';
import { DatabaseContracts } from '../../../../core/contracts/generalDbContracts';

interface ImoduloDemoRepository extends DatabaseContracts {
  save(account: Account): Promise<any>;
}

export { ImoduloDemoRepository }