export default class BaseModel {
    name = 'model'

    primaryKey = 'id'

    constructor(db) {
        this.db = db
    }

    insert(params) {
        const argc = Object.keys(params).length

        const fields = `${Object.keys(params).join(', ')}`

        let values = '?,'.repeat(argc)
        values = values.substring(0, values.length - 1)

        const sql = `INSERT INTO ${this.name} (${fields}) VALUES (${values})`

        this.db.run(sql, Object.values(params))

        return sql
    }

    get(id) {
        const sql = `SELECT * FROM ${this.name} WHERE ${this.primaryKey} = ?`
        return this.db.instance.get(sql, [id])
    }

    all() {
        const sql = `SELECT * FROM ${this.name}`
        return this.db.instance.all(sql)
    }

    update(id, data) {
        const sql = `UPDATE ${this.name} SET nome = '${data.name}', descricao = '${data.bio}' WHERE ${this.primaryKey} = ?`
        return this.db.instance.run(sql, [id])
    }
}