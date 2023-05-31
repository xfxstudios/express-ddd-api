const fs=require('fs');

const createModule=async (name) => {

    const moduleFolder='./src/app/'+name;

    fs.mkdirSync(moduleFolder)
    fs.mkdirSync(moduleFolder+'/application')
    fs.mkdirSync(moduleFolder+'/application/'+name+'Case')
    fs.mkdirSync(moduleFolder+'/domain')
    fs.mkdirSync(moduleFolder+'/routes')
    fs.mkdirSync(moduleFolder+'/infrastructure')

    //UseCase
    fs.readFile(__dirname+'/assets/baseUseCase.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:name/g, `${name[0].toUpperCase()}${name.slice(1)}`)
            .replace(/:dtoname/g, name);

        fs.writeFile(`${moduleFolder}/application/${name}Case/${name}.case.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Caso de Uso ${name} creado en ruta ${moduleFolder}/application/${name}Case`);
        })
    })

    //DTO
    fs.readFile(__dirname+'/assets/baseDto.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:name/g, `${name[0].toUpperCase()}${name.slice(1)}`);

        fs.writeFile(`${moduleFolder}/application/${name}Case/${name}.dto.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`DTO ${name} creado en ruta ${moduleFolder}/application/${name}Case`);
        })
    })

    //Routes
    fs.readFile(__dirname+'/assets/baseRoutes.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:controllername/g, `${name[0].toUpperCase()}${name.slice(1)}`)
            .replace(/:name/g, name)

        fs.writeFile(`${moduleFolder}/routes/${name}.routes.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Archivo de rutas ${name} creado en ${moduleFolder}/application/routes`);
        })
    })

    //Controller
    fs.readFile(__dirname+'/assets/baseController.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:name/g, `${name[0].toUpperCase()}${name.slice(1)}`)
            .replace(/:casename/g, name)
            .replace(/:dtoname/g, name)

        fs.writeFile(`${moduleFolder}/infrastructure/${name}.controller.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Modulo ${name} creado en ruta ${moduleFolder}`);
        })
    })
}

module.exports={
    createModule
}