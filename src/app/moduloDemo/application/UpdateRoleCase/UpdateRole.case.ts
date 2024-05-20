import { ImoduloDemoRepository } from '../../domain/repositories/imoduloDemo.repository';
import ErrorMessages, {ErrorCodes, FlowsEnum} from "../../../../core/shared/services/Enums";
import {DbModelsEnum} from '../../../../core/shared/models';
import {_servResponse} from '../../../../core/shared/dependencies';

const _flow=`/${FlowsEnum.ROLES}`

export class UpdateRoleCase {

  constructor(
    private readonly repository:ImoduloDemoRepository
  ) {}

  async execute(_data: any) {
    return new Promise((resolve, reject) => {
      const {id, data} = _data
      this.repository.update(DbModelsEnum.ROLE, {_id:id}, data)
      .then((response) => {
        const _response = _servResponse.response({
          code:ErrorCodes.NO_ERROR,
          message:ErrorMessages[ErrorCodes.NO_ERROR],
          flow:_flow,
          data: response
        })
        resolve(_response)
      })
      .catch((e) => {
        const _response = _servResponse.response({
          error:true,
          code:ErrorCodes.BAD_REQUEST,
          message:e?.response?.data?.message??ErrorMessages[ErrorCodes.BAD_REQUEST],
          http: e?.response?.status??400,
          flow:_flow,
        })
        reject(_response)
      })

    })
  }
}