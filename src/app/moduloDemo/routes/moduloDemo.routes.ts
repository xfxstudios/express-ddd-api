import {Router} from 'express'
import {ModuloDemoController} from '../infrastructure/moduloDemo.controller'
import {FlowsEnum} from '../../../core/shared/services/Enums';
import authentication from '../../../core/middleware/validApiKey.middleware';

const controller=new ModuloDemoController()
const route=Router()
const _basePath=`/${FlowsEnum.HELLO}`


///////////////////////////////////////////
///////////// SECURITY ROUTES /////////////
///////////////////////////////////////////

route.get(`${_basePath}`,[authentication],controller.helloApp)

module.exports=route
