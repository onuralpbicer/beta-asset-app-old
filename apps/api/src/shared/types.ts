import { JwtPayload } from 'jsonwebtoken'
import { Middleware } from 'koa'

export type StateMiddleware = Middleware<
    { user_id: string; isAdmin: boolean } & JwtPayload
>
