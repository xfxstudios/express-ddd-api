import {IsNotEmpty,IsString} from "class-validator"

export class AuthLoginDTO {
  @IsString()
  @IsNotEmpty()
  private username: string
  @IsString()
  @IsNotEmpty()
  private password: string

  constructor(data: any) {
    this.username=data.username
    this.password=data.password
  }

  getUsername(): string {return this.username}
  getPassword(): string {return this.password}

  serialize() {
    return {
      username: this.getUsername(),
      password: this.getPassword(),
    }
  }
}