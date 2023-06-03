import {Router} from 'express'
import {TesterrorController} from '../infrastructure/testerror.controller'
import {FlowsEnum} from '../../../core/shared/services/Enums';
import authentication from '../../../core/middleware/validApiKey.middleware';

const controller=new TesterrorController()
const route=Router()
const _basePath=`/test`


///////////////////////////////////////////
///////////// SECURITY ROUTES /////////////
///////////////////////////////////////////

route.post(`${_basePath}/test-url`,[authentication],controller.testErrorUrl)

module.exports=route
