import _sql from '../sql/index.js';

const sql = _sql.users;

class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    create() {
        return this.db.none(sql.create);
    }

    drop() {
        return this.db.none(sql.drop);
    }

    empty() {
        return this.db.none(sql.empty);
    }

    add(values) {
        return this.db.one(sql.add, {
           uid: values.uid,
           name: values.name,
           email: values.email,
           photo: values.photo,
        });
    }

    all() {
        return this.db.any('select * from users order by uid desc');
    }

    find(uid) {
        return this.db.oneOrNone(sql.find, {
            uid: uid,
        });
    }

    delete(uid) {
        return this.db.none(sql.delete, {
            uid: uid,
        });
    }
}

export default UsersRepository;
