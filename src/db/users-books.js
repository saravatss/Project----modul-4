import { readFileSync, writeFileSync } from 'node:fs';
import { Router } from '../../core/index.js';

const usersRouter = new Router();

usersRouter.post('/users/books', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const newUser = JSON.parse(data);
            const DBUsersBooks = JSON.parse(readFileSync('./src/db/users-books.json', 'utf-8'));

            const hasUser = DBUsersBooks.find(user => user.userId === parseInt(newUser.userId));

            if (!hasUser) {
                DBUsersBooks.push(newUser);

                writeFileSync('./src/db/users-books.json', JSON.stringify(DBUsersBooks));

                response.end(JSON.stringify(DBUsersBooks));
            } else {
                response.end(JSON.stringify({
                    message: 'Такой пользователь уже есть'
                }));
            }
        });
});
