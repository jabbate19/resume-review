import promise from 'bluebird';
import pgPromise from 'pg-promise';

import resumes from './repos/resumes.js';
import comments from './repos/comments.js';
import users from './repos/users.js';
import config from '../config.js';

const repos = {
    resumes: resumes,
    comments: comments,
    users: users
};

const options = {
    promiseLib: promise,
    extend: (obj, dc) => {
        obj.resumes = new repos.resumes(obj, pgp);
        obj.comments = new repos.comments(obj, pgp);
        obj.users = new repos.users(obj, pgp);
    }
}

const props = {
    host: 'postgres.csh.rit.edu',
    database: config.db.name,
    user: config.db.username,
    password: config.db.password,
    ssl: true,
};

const pgp = pgPromise(options);

const db = pgp(props);

export default db;
