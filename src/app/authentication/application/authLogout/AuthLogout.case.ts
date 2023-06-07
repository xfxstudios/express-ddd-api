import {AuthLogoutDTO} from './AuthLogou.dto';
import {ValidProperties} from '../../../../core/shared/decorators/generalDecorators';
import ErrorMessages,{FlowsEnum,ErrorCodes} from '../../../../core/shared/services/Enums';
import {AuthRepository} from '../../../../core/shared/repositories/auth.repository';
import {_servLog,_servResponse} from '../../../../core/shared/dependencies';
import { IResponse } from '../../../../core/shared/services/ResponseService';

const _flow=FlowsEnum.AUTHENTICATION

export class AuthLogoutCase {

  constructor(
    private readonly repository: AuthRepository
  ) {}

  @ValidProperties(_flow)
  async execute(data: AuthLogoutDTO):Promise<IResponse> {
    return new Promise((resolve,reject) => {
      if(data['valid_error']) {
        reject(data['error_data'])
      }

      this.repository.makeLogOut(data.getToken())
        .then((_) => {
          const _response=_servResponse.response({
            code: ErrorCodes.NO_ERROR,
            message: ErrorMessages[ErrorCodes.NO_ERROR],
            flow: _flow
          })
          resolve(_response)
        })
        .catch((e) => {
          const _error=_servResponse.response({
            error: true,
            code: e.code,
            http: e.httpcode,
            message: e.message,
            flow: _flow,
            received: data.serialize()
          })
          _servLog.setError(`${_flow} - ${_error.message}`,_error)
          reject(_error)
        })

    })
  }
}