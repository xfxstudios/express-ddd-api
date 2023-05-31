import {Router} from 'express'
import authentication from '../../../core/middleware/validApiKey.middleware'
import {AuthController} from '../infrastructure/AuthController';
import {FlowsEnum} from '../../../core/shared/services/Enums';
import {validTokenMiddleware} from '../../../core/middleware/validToken.middleware';


const _controller=new AuthController()
const route=Router()
const _basePath=`/${FlowsEnum.AUTHENTICATION}`

route.post(`${_basePath}`,[authentication],_controller.setLogin)
route.delete(`${_basePath}`,[authentication,validTokenMiddleware],_controller.setLogout)

module.exports=route