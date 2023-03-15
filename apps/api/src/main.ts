import koa from 'koa'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = new koa()

app.use(async (ctx) => {
    ctx.body = { message: await prisma.users.findMany() }
})

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`)
})
