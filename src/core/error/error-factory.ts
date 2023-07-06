import {_servLog} from "../shared/dependencies"

export const createFactoryError=function(name: string) {
  return class CustomizedError extends Error {

    constructor(
      message: string,
      public readonly code: number,
      public readonly httpcode: number|string
    ) {
      super(message)
      this.name=name
      this.code=code
      this.httpcode=httpcode

      this._logError()
    }

    private _logError(){
      _servLog.setError(this.message, {name: this.name, code: this.code, httpcode: this.httpcode})
    }

  }
}