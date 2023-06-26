const fs=require('fs');

const createDbModel=async (name) => {

    const modelFolder='./src/core/shared/models/';

    //fs.mkdirSync(modelFolder)

    //UseCase
    fs.readFile(__dirname+'/assets/baseMongoModel.txt', 'utf8', (err, data) => {
        if(err) {
            throw new Error(err);
        }
        const result=data
            .replace(/:name/g, `${name[0].toUpperCase()}${name.slice(1)}`)
            .replace(/:collection/g, `${name}`);

        fs.writeFile(`${modelFolder}/${name}.model.ts`, result, (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log(`Modelo MongoDB ${name} creado en ruta ${modelFolder}`);
        })
    })
}

module.exports={
    createDbModel
}