import BaseModel from "./model.js"

export default class UserRepository extends BaseModel {
    name = 'user'

    primaryKey = 'matricula'

    constructor(dao) {
        super(dao)
        this.dao = dao
    }
  
    create() {
        const sql = `
        CREATE TABLE IF NOT EXISTS user (
            matricula TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            senha TEXT NOT NULL,
            foto TEXT,
            descricao TEXT
        )`
        
        return this.dao.run(sql)
    }
    
    getByToken(token) {
        const sql = `SELECT * FROM user
            INNER JOIN auth_token
            ON user.matricula = auth_token.id_user
            WHERE auth_token.token = ?
        `

        return this.dao.instance.get(sql, [token])
    }
}