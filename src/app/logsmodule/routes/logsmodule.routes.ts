import {Router} from 'express'
import {LogsmoduleController} from '../infrastructure/logsmodule.controller'
import {FlowsEnum} from '../../../core/shared/services/Enums';
import authentication from '../../../core/middleware/validApiKey.middleware';

const controller=new LogsmoduleController()
const route=Router()
const _basePath=`/logs`


///////////////////////////////////////////
///////////// SECURITY ROUTES /////////////
///////////////////////////////////////////

route.get(`${_basePath}`,[authentication],controller.getFileList)
route.get(`${_basePath}/content/:file`,[authentication],controller.getFileContent)

module.exports=route
