import {ValidProperties} from "../../../../core/shared/decorators/generalDecorators";
import {_servRequest, _servResponse} from "../../../../core/shared/dependencies";
import {TesterrorDTO} from "./testerror.dto";
import ErrorMessages, { ErrorCodes, HttpErrorCode} from '../../../../core/shared/services/Enums';
import { TestErrorRepository } from '../../domain/testerror.repository';
import { IResponse } from '../../../../core/shared/services/ResponseService';

const _flow="TestErrorUrl"

export class TesterrorCase {

  constructor(
    private readonly repository:TestErrorRepository
  ) {}

  @ValidProperties(_flow)
  async execute(data: TesterrorDTO):Promise<IResponse> {

    return new Promise((resolve, reject) => {

      _servRequest.setUrl("").setHeaders({}).setBody({})

      this.repository.testUrl(data.getUrl())
      .then(({data}:any) => {
        const _response = _servResponse.response({
          code:ErrorCodes.NO_ERROR,
          http:HttpErrorCode.OK,
          message:ErrorMessages[ErrorCodes.NO_ERROR],
          flow:_flow,
          data: data
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
          received: data.serialize(),
        })
        reject(_error)
      })

    })
  }
}