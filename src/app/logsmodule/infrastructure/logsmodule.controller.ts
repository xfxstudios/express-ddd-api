import {Request,Response} from "express";
import {LogsmoduleCase} from '../application/logsmoduleCase/logsmodule.case'
import {LogsmoduleDTO} from '../application/logsmoduleCase/logsmodule.dto'
import {_repoLogs} from "../../../core/shared/dependencies";

export class LogsmoduleController {

  /**
   * Hello LogsmoduleController
   * @param req
   * @param res
   */
  async getFileList(req: Request,res: Response) {

    const _int = new LogsmoduleCase(_repoLogs)
    _int.execute()
      .then((resp:any) => res.status(resp.http).send(resp))
      .catch((e:any) => res.status(e.http??400).send(e))
  }

  /**
   * Hello LogsmoduleController
   * @param req
   * @param res
   */
  async getFileContent(req: Request,res: Response) {

    const _int = new LogsmoduleCase(_repoLogs)
    _int.executeContent(req.params.file)
      .then((resp:any) => res.status(resp.http).send(resp))
      .catch((e:any) => res.status(e.http??400).send(e))
  }

}