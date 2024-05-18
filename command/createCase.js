const fs=require('fs');

const capitalize = (value) => {
    const [firstLetter, ...restOfWord] = value;
    return firstLetter.toUpperCase()+restOfWord.join('')
}

const createCase=async (module, name) => {

    const moduleFolder='./src/app/'+module+'/application';
    const caseFolder=moduleFolder+'/'+capitalize(name)+'Case'

    fs.mkdirSync(caseFolder)

    //UseCase
    fs.readFile(__dirname+'/assets/baseUseCase.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        console.log("::::::::::::::", module)
        const result=data
            .replaceAll(/:name/g, `${capitalize(name)}`)
            .replaceAll(/:modulename/g, `${module}`);


        fs.writeFile(`${caseFolder}/${capitalize(name)}.case.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Caso de Uso ${capitalize(name)} creado en ruta ${caseFolder}`);
        })
    })

    //DTO
    fs.readFile(__dirname+'/assets/baseDto.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replaceAll(/:name/g, `${capitalize(name)}`)

        fs.writeFile(`${caseFolder}/${capitalize(name)}.dto.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`DTO ${capitalize(name)} creado en ruta ${caseFolder}/${name}Case`);
        })
    })
}

module.exports={
    createCase
}