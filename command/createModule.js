const fs=require('fs');

const capitalize = (value) => {
    const [firstLetter, ...restOfWord] = value;
    return firstLetter.toUpperCase()+restOfWord.join('')
}

const createModule=async (name) => {

    const moduleFolder='./src/app/'+name[0].toUpperCase()+name.slice(1);

    fs.mkdirSync(moduleFolder)
    fs.mkdirSync(moduleFolder+'/application')
    fs.mkdirSync(moduleFolder+'/application/'+name+'Case')
    fs.mkdirSync(moduleFolder+'/domain')
    fs.mkdirSync(moduleFolder+'/domain/repositories')
    fs.mkdirSync(moduleFolder+'/domain/entities')
    fs.mkdirSync(moduleFolder+'/routes')
    fs.mkdirSync(moduleFolder+'/infrastructure')
    fs.mkdirSync(moduleFolder+'/infrastructure/persistence')
    fs.mkdirSync(moduleFolder+'/interfaces')
    fs.mkdirSync(moduleFolder+'/interfaces/http')

    //UseCase
    fs.readFile(__dirname+'/assets/baseUseCase.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replaceAll(/:name/g, `${capitalize(name)}`)

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
            .replace(/:name/g, `${capitalize(name)}`);

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
            .replaceAll(/:name/g, `${capitalize(name)}`)

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
            .replaceAll(/:name/g, `${capitalize(name)}`)
            .replace(/:casename/g, capitalize(name))

        fs.writeFile(`${moduleFolder}/interfaces/http/${name}.controller.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Modulo ${name} creado en ruta ${moduleFolder}`);
        })
    })

    //IRepository
    fs.readFile(__dirname+'/assets/baseIRepository.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:name/g, `I${capitalize(name)}`)

        fs.writeFile(`${moduleFolder}/domain/repositories/i${capitalize(name)}.repository.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Archivo de repositorio ${name} creado en ${moduleFolder}/domain/repositories`);
        })
    })
    
    //Entitie
    fs.readFile(__dirname+'/assets/baseEntitie.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:name/g, `I${name[0].toLowerCase()}${name.slice(1)}`)

        fs.writeFile(`${moduleFolder}/domain/entities/Account.entitie.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Archivo de entidad creado en ${moduleFolder}/domain/entities`);
        })
    })

    //Repository
    fs.readFile(__dirname+'/assets/baseRepository.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replaceAll(/:name/g, `${capitalize(name)}`)

        fs.writeFile(`${moduleFolder}/infrastructure/persistence/${name}.repository.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Archivo de persistencia ${name} creado en ${moduleFolder}/infrastructure/persistence`);
        })
    })
}

module.exports={
    createModule
}