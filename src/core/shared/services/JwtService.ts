import jwt from 'jsonwebtoken'
import path from 'path';
import fs from 'fs'

const _private=process.env.APP_SECURITY_PRIVATE_KEY??fs.readFileSync(path.resolve('src/core/config/certs/private_key.pem'),'utf8')
const _public=process.env.APP_SECURITY_PUBLIC_KEY??fs.readFileSync(path.resolve('src/core/config/certs/public_key.pem'),'utf8')


export class JwtService {

  createToken(params: object,expire: any): string|boolean {

    try {
      const _date=new Date()
      const token=jwt.sign({...params,iat: _date.getTime()},_private,{algorithm: 'RS256',expiresIn: expire});
      return token
    } catch(err) {
      console.log(err)
      return false
    }
  }

  validToken(token: any) {

    try {
      const decoded: any=jwt.verify(token,_public);
      return {
        decoded,
        expires_min: this._jwtTiming(decoded)
      }
    } catch(e) {
      throw new Error(e.message)
    }

  }

  /**
   * Return diference in minutes
   * @param data 
   * @returns 
   */
  _jwtTiming(data: any) {
    const fechaInicio: any=new Date(data.iat);
    const fechaFinal: any=new Date(data.exp);

    const diferenciaEnMilisegundos=fechaFinal.getTime()-fechaInicio.getTime();
    return Math.floor(diferenciaEnMilisegundos/60000);
  }

}