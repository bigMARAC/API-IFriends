import BaseModel from "./model.js"
import jwt from 'jsonwebtoken'

export default class TokenRepository extends BaseModel {
    name = 'auth_token'

    constructor(dao) {
        super(dao)
        this.dao = dao
    }

    generate(hash, timestamp) {
        return jwt.sign({
            hash,
            timestamp
        }, 'got a secret?')
    }
  
    async create() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.name} (
            token TEXT PRIMARY KEY,
            id_user TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_in DATETIME NOT NULL,
            FOREIGN KEY (id_user) REFERENCES user(matricula)
        )`
        
        return this.dao.run(sql)
    }
    
    async get(id) {
        const sql = `SELECT * FROM ${this.name} WHERE token = ?`
        return this.dao.instance.get(sql, [id])
    }
}