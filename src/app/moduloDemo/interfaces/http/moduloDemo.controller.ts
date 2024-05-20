import {Request,Response} from "express";
import {ModuloDemoDTO} from "../../application/NewRoleCase/moduloDemo.dto";
import {ModuloDemoCase} from "../../application/NewRoleCase/moduloDemo.case";
import {ModuloDemoRepository} from "../../infrastructure/persistence/moduloDemo.repository";
import {GetRolesCase} from "../../application/GetRolesCase/GetRoles.case";
import { DeleteRoleCase } from '../../application/DeleteRoleCase/DeleteRole.case';
import { DeleteAllRoleCase } from '../../application/DeleteAllRoleCase/DeleteAllRole.case';
import { UpdateRoleCase } from '../../application/UpdateRoleCase/UpdateRole.case';

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

  async getRoles(req: Request,res: Response) {

    
    const _int = new GetRolesCase(
      new ModuloDemoRepository()
    )
    _int.execute()
      .then((resp) => res.send(resp))
      .catch((e) => res.status(e.http??400).send(e))
  }

  async deleteRole(req: Request,res: Response) {

    
    const _int = new DeleteRoleCase(
      new ModuloDemoRepository()
    )
    _int.execute(req.params.id)
      .then((resp) => res.send(resp))
      .catch((e) => res.status(e.http??400).send(e))
  }

  async updateRole(req: Request,res: Response) {

    
    const _int = new UpdateRoleCase(
      new ModuloDemoRepository()
    )
    _int.execute({id:req.params.id, data:req.body})
      .then((resp) => res.send(resp))
      .catch((e) => res.status(e.http??400).send(e))
  }

  async deleteAllRole(req: Request,res: Response) {

    
    const _int = new DeleteAllRoleCase(
      new ModuloDemoRepository()
    )
    _int.execute()
      .then((resp) => res.send(resp))
      .catch((e) => res.status(e.http??400).send(e))
  }

}