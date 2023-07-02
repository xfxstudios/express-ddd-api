import {Response,Request} from 'express';
import {AuthLoginDTO} from '../application/authLogin/AuthLogin.dto';
import {AuthLoginCase} from '../application/authLogin/AuthLogin.case';
import {_repoAuth} from '../../../core/shared/dependencies';
import {AuthLogoutDTO} from '../application/authLogout/AuthLogou.dto';
import {AuthLogoutCase} from '../application/authLogout/AuthLogout.case';
import {IUseCaseContract} from '../../../core/contracts/class_contracts/UseCase.contract';
export class AuthController {

  async setLogin(req: Request,res: Response) {

    const _dto=new AuthLoginDTO(req.body)
    const _case:IUseCaseContract=new AuthLoginCase(_repoAuth)
    _case.execute(_dto)
      .then((response) => res.json(response))
      .catch((e) => res.status(e.http??400).json(e))
  }

  async setLogout(req: Request,res: Response) {

    const _dto=new AuthLogoutDTO({token: req.get('authorization')})
    const _case:IUseCaseContract=new AuthLogoutCase(_repoAuth)
    _case.execute(_dto)
      .then((response) => res.json(response))
      .catch((e) => res.status(e.http??400).json(e))
  }

}