import {_servResponse} from "../../../../core/shared/dependencies";
import {LogsRepository} from "../../../../core/shared/repositories/logs.repository";
import {ErrorCodes, HttpErrorCode} from "../../../../core/shared/services/Enums";
import ErrorMessages from '../../../../core/shared/services/Enums';

const _flow="LogsViewer"

export class LogsmoduleCase {

  constructor(
    private readonly logsRepository:LogsRepository
  ) {}

  async execute() {
    return new Promise((resolve, reject) => {
      this.logsRepository.getLogsFiles()
      .then((response) => {
        const _response = _servResponse.response({
          code:ErrorCodes.NO_ERROR,
          http: HttpErrorCode.OK,
          message:ErrorMessages[ErrorCodes.NO_ERROR],
          flow:_flow,
          data: response
        })
        resolve(_response)
      })
      .catch((err) => {
        const _error = _servResponse.response({
          error:true,
          code:err.code,
          http:err.httpcode,
          message:err.message,
          flow:_flow,
          errors:[]
        })
        reject(_error)
      })

    })
  }

  async executeContent(file:string) {
    return new Promise((resolve, reject) => {
      this.logsRepository.getLogsContent(file)
      .then((response) => {
        const _response = _servResponse.response({
          code:ErrorCodes.NO_ERROR,
          http: HttpErrorCode.OK,
          message:ErrorMessages[ErrorCodes.NO_ERROR],
          flow:_flow,
          data: response
        })
        resolve(_response)
      })
      .catch((err) => {
        const _error = _servResponse.response({
          error:true,
          code:err.code,
          http:err.httpcode,
          message:err.message,
          flow:_flow,
          errors:[]
        })
        reject(_error)
      })

    })
  }
}