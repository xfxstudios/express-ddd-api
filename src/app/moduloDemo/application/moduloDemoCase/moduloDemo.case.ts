import {ValidProperties} from "../../../../core/shared/decorators/generalDecorators";
import { ImoduloDemoRepository } from '../../domain/repositories/imoduloDemo.repository';
import {ModuloDemoDTO} from "./moduloDemo.dto";

const _flow="FlowHere"

export class ModuloDemoCase {

  constructor(
    private readonly repository:ImoduloDemoRepository
  ) {}

  @ValidProperties(_flow)
  async execute(data: ModuloDemoDTO) {
    return new Promise((resolve, reject) => {

      resolve(true)

    })
  }
}