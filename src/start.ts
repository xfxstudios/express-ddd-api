require('dotenv').config()
import cluster from "node:cluster"
import os from "os"
import Server from './core/server/Server';

// const cpuCount = os.cpus().length;
const cpuCount = 1;

if(cluster.isPrimary){
  console.log(`The total number of CPUs is ${cpuCount}`)
  console.log(`Primary Service pid=${process.pid}`);

  for(let i = 0; i < cpuCount; i++){
    console.log(`::::: WORKER ${i} :::::`)
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} has been killed`);
    console.log("Starting another worker");
    cluster.fork();
  })

}else{
  new Server();
}
