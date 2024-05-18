import {Request,Response} from "express";
import {ModuloDemoDTO} from "../../application/moduloDemoCase/moduloDemo.dto";
import {ModuloDemoCase} from "../../application/moduloDemoCase/moduloDemo.case";
import {ModuloDemoRepository} from "../../infrastructure/persistence/moduloDemo.repository";

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
      .then((resp) => res.send(resp))
      .catch((e) => res.status(e.http??400).send(e))
  }

}