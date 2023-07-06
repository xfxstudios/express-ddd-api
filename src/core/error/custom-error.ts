import {_servLog} from "../shared/dependencies"

export class CustomError extends Error {

  constructor(
    message: string,
    public readonly name: string,
    public readonly code?: number,
    public readonly httpcode?: number
  ) {
    super(message)
    this.name=name??'CustomError'
    this.code=code??400
    this.httpcode=httpcode??400

    this._logError()
  }

  private _logError(){
    _servLog.setError(this.message, {name: this.name, code: this.code, httpcode: this.httpcode})
    
  }
}