import UserRepository from './../database/user.js'
import bcrypt from 'bcrypt'

export default class UserController {

    constructor(database) {
        this.repository = new UserRepository(database)
    }

    async register(req, res) {
        if (req.body.password.length < 8) {
            res.status(403)
            res.send({message: 'invalid field: password'})
        }
        
        if (req.body.name && req.body.password && req.body.login) {
            bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                if (!err) {
                    this.repository.insert({nome: req.body.name, matricula: req.body.login, senha: encrypted})
                    res.send({'message': 'user created'})
                } else {
                    res.status(400)
                    res.send({error: "error"})
                }
            })
        } else {
            res.status(400)
            res.send({error: "error"})
        }
    }

    async me(req, res) {
        const user = await this.repository.getByToken(req.headers.token)
        res.send(user)
    }

    async nearby(req, res) {
        const users = await this.repository.all()
        res.send(users)
    }
}