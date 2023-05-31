const exec=require('child_process').exec;
const {createModule}=require('./command/createModule');
const {createCase}=require('./command/createCase');

const opsModule={
    name: {
        demand: true,
        alias: 'n'
    }
}
const opsCase={
    name: {
        demand: true,
        alias: 'n'
    },
    module: {
        demand: true,
        alias: 'm'
    }
}

const argv=require('yargs')
    .command('module', 'Crea un Modulo en TypeScript', opsModule)
    .command('case', 'Crea un Caso de uso en TypeScript', opsCase)
    .help()
    .argv;

switch(argv._[0]) {
    case 'module':
        createModule(argv.name);
        break;
    case 'case':
        createCase(argv.module, argv.name);
        break;

    default:
        console.log("Debe enviar el nombre de un comando");
        (exec('node command --help', (error, stdout, stderr) => {console.log('stdout: '+stdout);}));
        break;
}