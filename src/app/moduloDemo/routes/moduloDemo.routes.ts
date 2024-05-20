import {Router} from 'express'
import {FlowsEnum} from '../../../core/shared/services/Enums';
import authentication from '../../../core/middleware/validApiKey.middleware';
import { ModuloDemoController } from '../interfaces/http/moduloDemo.controller';

const controller=new ModuloDemoController()
const route=Router()
const _basePath=`/${FlowsEnum.ROLES}`


///////////////////////////////////////////
///////////// SECURITY ROUTES /////////////
///////////////////////////////////////////

route.post(`${_basePath}`,[authentication],controller.helloApp)
route.get(`${_basePath}`,[authentication],controller.getRoles)
route.delete(`${_basePath}/:id`,[authentication],controller.deleteRole)
route.put(`${_basePath}/:id`,[authentication],controller.updateRole)
route.delete(`${_basePath}/delete/all`,[authentication],controller.deleteAllRole)

module.exports=route
