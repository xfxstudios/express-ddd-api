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
  }
}