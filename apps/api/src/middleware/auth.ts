import jwt from 'jsonwebtoken'
import { UnauthorizedError } from './error'
import { StateMiddleware } from '../shared/types'

export const authMiddleware: StateMiddleware = async (ctx, next) => {
    const authToken = ctx.headers.authorization
    if (!authToken) throw new UnauthorizedError()

    try {
        const decoded = jwt.verify(
            authToken.replace('Bearer ', ''),
            process.env.JWT_TOKEN,
        )

        if (typeof decoded === 'string') {
            // won't happen
            return
        }

        ctx.state = {
            ...decoded,
            user_id: decoded.user_id,
            isAdmin: decoded.isAdmin,
        }
    } catch (err) {
        console.log('error')
        console.log(err.message)
        if (err.message === 'invalid token') throw new UnauthorizedError()
        else throw err
    }

    await next()
}
