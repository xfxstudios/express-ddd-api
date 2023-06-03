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
    }
  }
}