import {GeneralService} from './services/GeneralServices';
import ResponseService, {IResponseService} from './services/ResponseService';
import {SmartLogger} from 'node_smart_logger';
import {RequestService} from './services/requestHelper/requestService';
import {JwtService} from './services/JwtService';
import {GeneralRepository} from './persistence/general.repository';


/**
 * Repositories
 */
export const _repoGeneral=new GeneralRepository()


/**
 * SERVICES
 */
export const _servGeneral=new GeneralService()
export const _servResponse:IResponseService=new ResponseService()
export const _servLog=new SmartLogger()
export const _servRequest=new RequestService()
export const _servJwt=new JwtService()