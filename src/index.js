import AuthController from './controllers/AuthController.js'
import AuthMiddleware from './middlewares/AuthMiddleware.js'
import DAO from './database/dao.js'
import Express from 'express'
import SubjectController from './controllers/SubjectController.js '
import UserController from './controllers/UserController.js '
import cors from 'cors'

const app = Express()
app.use(cors())

// Aqui foi necessário usar uma gambiarrazinha de leve pra poder inicializar o banco de dados
// usando async/await pois o Node ainda não suporta top-level awaits. 
// https://v8.dev/features/top-level-await#:~:text=Top%2Dlevel%20await%20enables%20developers,they%20start%20evaluating%20their%20body.
let database
(async () => {
    database = new DAO('./../database.db')
    await database.init()
})();

// Inicializa os containers que irão tratar as rotas da aplicação
const controllers = {
    user: new UserController(database),
    auth: new AuthController(database),
    subject: new SubjectController(database)
}


// Rotas abertas são todas as rotas que qualquer cliente pode acessar
const openRouter = new Express.Router()
openRouter.use(Express.json())
openRouter.post('/register', (req, res) => controllers.user.register(req, res))
openRouter.post('/auth', (req, res) => controllers.auth.auth(req, res))

// As rotas autenticadas precisam passar pelo AuthMiddleware, ele verifica se o
// token passado no header da requisição existe no banco de dados.
const authenticatedRouter = new Express.Router()
authenticatedRouter.use(AuthMiddleware)

authenticatedRouter.get('/me', (req, res) => controllers.user.me(req, res))
authenticatedRouter.get('/nearby', (req, res) => controllers.user.nearby(req, res))
authenticatedRouter.post('/update', (req, res) => controllers.user.update(req, res))

authenticatedRouter.post('/subject', (req, res) => controllers.subject.store(req, res))
authenticatedRouter.get('/subject/all', (req, res) => controllers.subject.all(req, res))

app.use('/', openRouter)
app.use('/', authenticatedRouter)
app.listen(3000);

