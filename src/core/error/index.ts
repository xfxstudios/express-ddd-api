import {SystemError} from "../shared/services/Enums";
import {createFactoryError} from "./error-factory";

export interface IErrorResponse {
  message: string,
  name: string,
  code: number,
  httpcode: number
}

export const AuthenticationError=createFactoryError(SystemError.AUTHENTICATIONERROR)
export const DatabaseError=createFactoryError(SystemError.DATABASEERROR)
export const GeneralError=createFactoryError(SystemError.GENERALERROR)
export const ValidationError=createFactoryError(SystemError.VALIDATIONERROR)
export const NotFoundError=createFactoryError(SystemError.NOTFOUNDERROR)
export const HttpError=createFactoryError(SystemError.HTTPERROR)