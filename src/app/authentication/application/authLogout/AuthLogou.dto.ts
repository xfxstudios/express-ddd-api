export class AuthLogoutDTO {
  private token: string

  constructor(data: any) {
    this.token=data.token
  }

  getToken(): string {
    let _t: string=this.token.split(' ')[1]
    return _t
  }

  serialize() {
    return {
      token: this.getToken()
    }
  }
}