import {_servRequest} from "../../../core/shared/dependencies"

export class TestErrorRepository {
  
  async testUrl(url:string){

    return new Promise(async(resolve, reject) =>{
      try{
        const response = await _servRequest.setUrl(url).doGet()
        resolve(response)
      }catch(e){
        reject(e)
      }
    })    

  }

}