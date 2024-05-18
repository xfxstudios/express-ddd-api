import {ValidProperties} from "../../../../core/shared/decorators/generalDecorators";
import {DbModelsEnum} from "../../../../core/shared/models";
import { ImoduloDemoRepository } from '../../domain/repositories/imoduloDemo.repository';
import {ModuloDemoDTO} from "./moduloDemo.dto";
import { _servResponse } from '../../../../core/shared/dependencies';
import { ErrorCodes } from '../../../../core/shared/services/Enums';
import ErrorMessages from '../../../../core/shared/services/Enums';
import {RoleEntity} from "../../domain/entities/Role.entity";


const _flow="FlowHere"

export class ModuloDemoCase {

  constructor(
    private readonly repository:ImoduloDemoRepository
  ) {}

  @ValidProperties(_flow)
  async execute(data: ModuloDemoDTO) {
    return new Promise((resolve, reject) => {
      
      const {id, name, description} = data.serialize()

      const _role = new RoleEntity(id, name, description)

      this.repository.save(DbModelsEnum.ROLE, _role)
      .then((response)=> {
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
          message:e?.response?.data?.message??e.message??ErrorMessages[ErrorCodes.BAD_REQUEST],
          http: e?.response?.status??e.httpcode??400,
          received: data.serialize(),
          flow:_flow,
        })
        reject(_response)
      })

    })
  }
}
