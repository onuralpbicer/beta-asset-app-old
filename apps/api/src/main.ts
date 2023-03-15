import koa from 'koa'
import { errorMiddleware } from './middleware/error'
import bodyParser from 'koa-bodyparser'
import authRouter from './routes/auth'
import { setupDatabase } from './shared/database'
import Router from 'koa-router'
import { authMiddleware } from './middleware/auth'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

setupDatabase()

const app = new koa()

app.use(errorMiddleware)
app.use(bodyParser())

app.use(authRouter.routes())

const authenticatedRoutes = new Router()

authenticatedRoutes.use(authMiddleware)

authenticatedRoutes.get('/', (ctx) => {
    ctx.body = {
        message: 'test',
    }
})

app.use(authenticatedRoutes.routes())

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`)
})
