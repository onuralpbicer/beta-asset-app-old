import { JwtPayload } from 'jsonwebtoken'
import { Middleware } from 'koa'

export type IStateMiddleware = Middleware<
    { user_id: string; isAdmin: boolean; org_id: string } & JwtPayload
>
