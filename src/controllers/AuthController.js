import TokenRepository from '../database/token.js'
import UserRepository from '../database/user.js'
import bcrypt from 'bcrypt'

export default class AuthController {

    constructor(database) {
        this.repository = new UserRepository(database)
        this.tokenRepository = new TokenRepository(database)
    } 

    async auth(req, res, database) {
        if (req.body.login && req.body.password) {
            const user = await this.repository.get(req.body.login)

            if (user) {
                bcrypt.compare(req.body.password, user["senha"], (err, result) => {
                    if (result) {
                        const token = this.tokenRepository.generate(user["senha"], Date())
                        
                        const inserted = this.tokenRepository.insert({
                            id_user: user["matricula"],
                            token,
                            expires_in: "(datetime('now', '+3 days'))"
                        })

                        res.status(200)
                        res.send({
                            type: 'Bearer',
                            accessToken: token,
                            expiresIn: inserted["expires_in"]
                        })
                    } else {
                        res.status(403)
                        res.send({"message": "Senha incorreta"})
                    }
                })
            } else {
                res.status(403)
                res.send({"message": "Usuário não encontrado"})
            }
        } else {
            res.status(400)
            res.send({"message": "Campos inválidos"})
        }
    }
}