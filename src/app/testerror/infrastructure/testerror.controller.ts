import {Request,Response} from "express";
import {TesterrorCase} from '../application/testerrorCase/testerror.case'
import {TesterrorDTO} from '../application/testerrorCase/testerror.dto'
import {TestErrorRepository} from "../domain/testerror.repository";

export class TesterrorController {

  /**
   * Hello TesterrorController
   * @param req
   * @param res
   */
  async testErrorUrl(req: Request,res: Response) {

    const _dto = new TesterrorDTO(req.body)
    const _int = new TesterrorCase(new TestErrorRepository())
    _int.execute(_dto)
      .then((resp:any) => res.status(resp.http).send(resp))
      .catch((e:any) => res.status(e.http??400).send(e))
  }

}