import {Router} from 'express'
import {FlowsEnum} from '../../../core/shared/services/Enums';
import authentication from '../../../core/middleware/validApiKey.middleware';
import { ModuloDemoController } from '../interfaces/http/moduloDemo.controller';

const controller=new ModuloDemoController()
const route=Router()
const _basePath=`/${FlowsEnum.HELLO}`


///////////////////////////////////////////
///////////// SECURITY ROUTES /////////////
///////////////////////////////////////////

route.post(`${_basePath}`,[authentication],controller.helloApp)

module.exports=route
