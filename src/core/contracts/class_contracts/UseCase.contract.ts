import {IResponse} from "../../shared/services/ResponseService";

export interface IUseCaseContract {
  execute(data:any):Promise<IResponse>
}