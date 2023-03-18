import { prisma } from '../shared/database'
import { IStateMiddleware } from '../shared/types'
import { UnauthorizedError } from './error'

export const orgIDAuthZ: IStateMiddleware = async (ctx, next) => {
    const { org_id, user_id } = ctx.state

    try {
        await prisma.users.findFirstOrThrow({
            where: {
                id: user_id,
                org_id,
            },
        })
    } catch (e) {
        console.log(e)
        throw new UnauthorizedError()
    }

    await next()
}
