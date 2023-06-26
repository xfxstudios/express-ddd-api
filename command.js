const exec=require('child_process').exec;
const {createModule}=require('./command/createModule');
const {createCase}=require('./command/createCase');
const {createDbModel}=require('./command/createDbModel');


const options={
    mongoModel: {
        name: {
            demand: true,
            alias: 'n'
        }
    },
    module: {
        name: {
            demand: true,
            alias: 'n'
        }
    },
    useCase: {
        name: {
            demand: true,
            alias: 'n'
        },
        module: {
            demand: true,
            alias: 'm'
        }
    }
}

const argv=require('yargs')
    .command('module', 'Crea un Modulo en TypeScript', options.module)
    .command('case', 'Crea un Caso de uso en TypeScript', options.useCase)
    .command('mdbmodel', 'Crea un Modelo para MongoDB en TypeScript', options.mongoModel)
    .help()
    .argv;

switch(argv._[0]) {
    case 'module':
        createModule(argv.name);
        break;
    case 'case':
        createCase(argv.module, argv.name);
        break;
    case 'mdbmodel':
        createDbModel(argv.name);
        break;

    default:
        console.log("Debe enviar el nombre de un comando");
        (exec('node command --help', (error, stdout, stderr) => {console.log('stdout: '+stdout);}));
        break;
}