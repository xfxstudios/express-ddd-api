import {GeneralService} from './services/GeneralServices';
import ResponseService from './services/ResponseService';
import {SmartLogger} from 'node_smart_logger';
import {RequestService} from './services/requestHelper/requestService';
import {AuthRepository} from './repositories/auth.repository';
import {JwtService} from './services/JwtService';
import {GeneralRepository} from './repositories/general.repository';
import {LogsRepository} from './repositories/logs.repository';


/**
 * Repositories
 */
export const _repoAuth=new AuthRepository()
export const _repoGeneral=new GeneralRepository()
export const _repoLogs=new LogsRepository()


/**
 * SERVICES
 */
export const _servGeneral=new GeneralService()
export const _servResponse=new ResponseService()
export const _servLog=new SmartLogger()
export const _servRequest=new RequestService()
export const _servJwt=new JwtService()