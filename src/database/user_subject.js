import BaseModel from "./model.js"

export default class UserSubjectRepository extends BaseModel {
    name = 'user_subject'

    constructor(dao) {
        super(dao)
        this.dao = dao
    }
  
    create() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.name} (
            id_user TEXT NOT NULL,
            id_subject INTEGER NOT NULL,
            PRIMARY KEY (id_user, id_subject)
        )`

        return this.dao.run(sql)
    }
}