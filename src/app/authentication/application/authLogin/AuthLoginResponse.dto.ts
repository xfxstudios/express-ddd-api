import {v4 as uuidv4} from 'uuid'
import TokenModel from '../../../../core/shared/models/TokenModel'
import {_servJwt} from '../../../../core/shared/dependencies'

export class AuthLoginResponseDTO {
  private _id: string
  private username: string
  private firstName: string
  private lastName: string
  private occupation: string
  private active: boolean
  private rol: string[]

  constructor(data: any) {
    this._id=data._id
    this.username=data.username
    this.firstName=data.firstName
    this.lastName=data.lastName
    this.occupation=data.occupation
    this.active=data.active
    this.rol=data.rol
  }

  getId(): string {return this._id}
  getUsername(): string {return this.username}
  getFirstName(): string {return this.firstName.charAt(0).toUpperCase()+this.firstName.slice(1)}
  getLastName(): string {return this.lastName.charAt(0).toUpperCase()+this.lastName.slice(1)}
  getOccupation(): string {return this.occupation}
  getActive(): boolean {return this.active}
  getRol(): string[] {return this.rol}
  getFullName(): string {
    return `${this.firstName.charAt(0).toUpperCase()+this.firstName.slice(1)} ${this.lastName.charAt(0).toUpperCase()+this.lastName.slice(1)}`
  }
  getToken(): any {
    let _date1=new Date()
    //_date1.setSeconds(3600)
    _date1.setSeconds(_date1.getSeconds()+3600)
    let _date2=new Date()
    _date2.setSeconds(_date2.getSeconds()+36000)

    let _tokens={
      //AccessToken: uuidv4(),
      AccessTokenExpires_in: _date1.getTime(),
      tokenType: 'Bearer',
      //RefreshToken: uuidv4(),
      RefreshTokenExpiresIn: _date2.getTime()
    }

    const _access=_servJwt.createToken({
      payload: {
        userId: this.getId(),
        username: this.getUsername(),
        firstName: this.getFirstName(),
        lastName: this.getLastName(),
        roles: this.getRol(),
      }
    },_tokens.AccessTokenExpires_in)
    const _access2=_servJwt.createToken({payload: {id: uuidv4()}},_tokens.RefreshTokenExpiresIn)
    _tokens['AccessToken']=_access
    _tokens['RefreshToken']=_access2

    TokenModel.deleteMany(
      {username: {$in: [this.getId()]}}
    ).then(async (_) => {
      await TokenModel.create({username: this.getId(),..._tokens})
    })
    return _tokens
  }

  serialize() {
    return {
      userId: this.getId(),
      username: this.getUsername(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      fullName: this.getFullName(),
      occupation: this.getOccupation(),
      isActive: this.getActive(),
      roles: this.getRol(),
      authotization: this.getToken(),
    }
  }
}