import { readFileSync, writeFileSync } from 'node:fs';
import { Router } from '../../core/index.js';

const usersRouter = new Router();

usersRouter.get('/users', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    const DBUsersBooks = new DBJson('./src/db/users.json'); 

    response.end(JSON.stringify(DBUsersBooks.getAll()));
});

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
            const DBUsersBooks = JSON.parse(readFileSync('./src/db/users-books.json'));

            const hasUser = DBUsersBooks.find(user => user.userId === parseInt(newUser.userId));

            if (!hasUser) {
                DBUsersBooks.add(newUser);

                writeFileSync('./src/db/users-books.json', JSON.stringify(DBUsersBooks));

                response.end(JSON.stringify(DBUsersBooks));
            } else {
                response.end(JSON.stringify({
                    message: 'Такой пользователь уже есть'
                }));
            }
        });
});


migraineRouter.post('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const newMigraine = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.add(newMigraine);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось добавить запись');
            }
        });
});


/* migraineRouter.get('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    const DBMigraine = new DBJson('./src/db/migraines.json'); 

    response.end(JSON.stringify(DBMigraine.getAll()));
});

migraineRouter.post('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const newMigraine = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.add(newMigraine);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось добавить запись');
            }
        });
});

//обновление списка
migraineRouter.put('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const url = new URL('http://127.0.0.1:8080' + request.url);
            const queryId = parseInt(url.searchParams.get('id'));

            const payload = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.updateById(queryId, payload);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось обновить запись');
            }
        });
});

migraineRouter.delete('/migraine', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const payload = JSON.parse(data);

            const DBMigraine = new DBJson('./src/db/migraines.json');

            const success = DBMigraine.deleteById(payload.id);

            if (success) {
                response.end(JSON.stringify(DBMigraine.getAll()));
            } else {
                response.end('Не удалось удалить запись');
            }
        });
});
*/