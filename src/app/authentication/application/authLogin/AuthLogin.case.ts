import {AuthLoginDTO} from './AuthLogin.dto';
import {ValidProperties} from '../../../../core/shared/decorators/generalDecorators';
import ErrorMessages,{FlowsEnum,ErrorCodes} from '../../../../core/shared/services/Enums';
import {AuthRepository} from '../../../../core/shared/repositories/auth.repository';
import {_servResponse,_servLog} from '../../../../core/shared/dependencies';
import { IResponse } from '../../../../core/shared/services/ResponseService';
import {IUseCaseContract} from '../../../../core/contracts/class_contracts/UseCase.contract';

const _flow=FlowsEnum.AUTHENTICATION

export class AuthLoginCase implements IUseCaseContract {

  constructor(
    private readonly repository: AuthRepository
  ) {

  }

  @ValidProperties(_flow)
  async execute(data: AuthLoginDTO):Promise<IResponse> {
    return new Promise((resolve,reject) => {
      
      this.repository.makeLogin(data.getUsername(),data.getPassword())
        .then((response) => {
          const _response=_servResponse.response({
            code: ErrorCodes.NO_ERROR,
            message: ErrorMessages[ErrorCodes.NO_ERROR],
            flow: _flow,
            data: response
          })

          resolve(_response)
        })
        .catch((err) => {

          const _error=_servResponse.response({
            error: true,
            code: err.code,
            http: err.httpcode,
            message: err.message,
            flow: _flow,
            received: data.serialize()
          })
          reject(_error)
        })

    })
  }
}