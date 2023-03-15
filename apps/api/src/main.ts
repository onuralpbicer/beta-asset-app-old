import koa from 'koa'
import { PrismaClient } from '@prisma/client'
import { InternalServerError, errorMiddleware } from './middleware/error'

const prisma = new PrismaClient()

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = new koa()

app.use(errorMiddleware)

app.use(async (ctx) => {
    throw new InternalServerError('testing')
    ctx.body = { message: await prisma.organisations.findMany() }
})

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`)
})
