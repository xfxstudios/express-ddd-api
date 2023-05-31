require('dotenv').config()
import Server from './core/server/Server';

const server=new Server();
server.listener();
