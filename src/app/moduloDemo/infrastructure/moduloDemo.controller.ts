import {Request,Response} from "express";
import {ModuloDemoCase} from '../application/moduloDemoCase/moduloDemo.case'
import {ModuloDemoDTO} from '../application/moduloDemoCase/moduloDemo.dto'
import { ModuloDemoRepository } from './persistence/moduloDemo.repository';

export class ModuloDemoController {

  /**
   * Hello ModuloDemoController
   * @param req
   * @param res
   */
  async helloApp(req: Request,res: Response) {

    const _dto = new ModuloDemoDTO(req.body)
    const _int = new ModuloDemoCase(
      new ModuloDemoRepository()
    )
    _int.execute(_dto)
      .then((resp) => res.send('Hello Word!!!'))
      .catch((e) => res.status(400).send('Error general'))
  }

}