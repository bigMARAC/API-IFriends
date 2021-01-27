import BaseModel from "./model.js"

export default class SubjectRepository extends BaseModel {
    name = 'subject'

    constructor(dao) {
        super(dao)
        this.dao = dao
    }
  
    create() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cor TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }
}