import {_servRequest} from "../../../core/shared/dependencies"

export class TestErrorRepository {
  
  async testUrl(url:string){
    return new Promise((resolve, reject) =>{
      _servRequest
      .setMethod("get")
      .setUrl(url)
      .doRequest()
      .then((response) => resolve(response))
      .catch((e) => reject(e))
    })    

  }

}