import {AuthLoginDTO} from './AuthLogin.dto';
import {ValidProperties} from '../../../../core/shared/decorators/generalDecorators';
import ErrorMessages,{FlowsEnum,ErrorCodes} from '../../../../core/shared/services/Enums';
import {AuthRepository} from '../../../../core/shared/repositories/auth.repository';
import {_servResponse,_servLog} from '../../../../core/shared/dependencies';

const _flow=FlowsEnum.AUTHENTICATION

export class AuthLoginCase {

  constructor(
    private readonly repository: AuthRepository
  ) {

  }

  @ValidProperties(_flow)
  async execute(data: AuthLoginDTO) {
    return new Promise((resolve,reject) => {
      if(data['valid_error']) {
        reject(data['error_data'])
      }

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
          _servLog.setError(`${_flow} - ${_error.message}`,_error)
          reject(_error)
        })

    })
  }
}