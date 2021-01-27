import DAO from './../database/dao.js'
import TokenRepository from './../database/token.js'

export default async function (request, response, next) {
    const database = new DAO('./../database.db')
    await database.init()

    const tokenRepository = new TokenRepository(database)
    const token = tokenRepository.get(request.headers.token)
    
    if (token) {
        next()
    } else {
        response.status(403)
        response.send({error: "user is not authenticated"})
    }
}