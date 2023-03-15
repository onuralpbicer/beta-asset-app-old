import koa from 'koa'
import { errorMiddleware } from './middleware/error'
import bodyParser from 'koa-bodyparser'
import authRouter from './routes/auth'
import { setupDatabase } from './shared/database'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

setupDatabase()

const app = new koa()

app.use(errorMiddleware)
app.use(bodyParser())

app.use(authRouter.routes())

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`)
})
