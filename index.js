import { Application } from './core/index.js';
import { booksRouter, usersRouter } from './src/routers/index.js';

const server = new Application();

server.addRouter(booksRouter);
server.addRouter(usersRouter);

server.listen(8080);