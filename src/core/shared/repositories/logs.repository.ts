import fs from 'fs'
import {HttpError} from '../../error'
const path = require('path')


export class LogsRepository {

  protected _logsPath:string

  constructor(_path:any=false){
    if(!_path){
      this._logsPath = path.resolve('logs')
    }else{
      this._logsPath = _path
    }
  }


  async getLogsFiles(){
    return new Promise((resolve, reject) => {
      console.log(this._logsPath)
      let _files:any = []
      const files = fs.readdirSync(this._logsPath)
      if(files.length>0){
        files.forEach(file => {
            const stat = fs.statSync(`${this._logsPath}/${file}`)
            if(!stat.isDirectory()){
              let _date = file.split('_')
              _files.push({
                date: new Date(`${_date[1]}-${_date[2]}-${_date[3].split('.')[0]}`).getTime(),
                name:`${file}`,
                url:`${this._logsPath}/${file}`,
              })
            }
        })
        resolve(_files.sort((a,b) => b.date - a.date))
      }else{
        resolve(_files)
      }
    })
  }

  async getLogsContent(_file:string){
    return new Promise((resolve, reject) => {
      try{
        fs.readFile(`${this._logsPath}/${_file}`, (err:any, data:any) => {
          let _out:any = []
          if(!err){
            let _line:any = data.toString().split('\n')

            // extrae todo lo que esta dentro de corchetes
            //const expresionRegular = /\[(.*?)\]/
            //extrae todo lo que este luego de los 2 puntos
            //const expresionContent = /:\s*(.*)/

            _line.forEach((_l:any) => {

              let _object:any = {}
              
              let _heads:any = _l.split('|')

              //Extraemos la fecha
              //let _d = expresionRegular.exec(_heads[0]??"[]")
              let _date = (_heads)?_heads[0]:null
              if(_date) _object['date'] = _date.trim()
              
              //Extraemos el tipo de log
              // let _t = expresionRegular.exec(_heads[1]??"[]")
              let _type = (_heads) ? _heads[1]:null
              if(_type) _object['type'] = _type.trim()

              // //Extraemos el flow
              // let _b = expresionRegular.exec(_heads[2]??"[]")
              let _body = (_heads) ? _heads[2]:null
              if(_body) _object['message'] = _body.trim()
              
              // //Extraemos la data si existe
              // let _c = expresionContent.exec(_heads[2]??"[]")
              let _content = (_heads) ? _heads[3]:null
              if(_content) _object['content'] = JSON.parse(_content.trim())
              
              _out.push(_object)

            })
            resolve(_out)
          }else{
            const _err = new HttpError(err.message, 2000, 400)
            reject(_err)
          }
        })
      }catch(e){
        reject(e)
      }
    })

  }

}