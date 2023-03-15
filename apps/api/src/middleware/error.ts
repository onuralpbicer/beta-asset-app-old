import { Middleware } from 'koa'

export const errorMiddleware: Middleware = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.error('Error: ', err.message ?? err)
        if (err instanceof CustomError) {
            ctx.status = err.code ?? 500
            ctx.body = {
                message: err.message,
                name: err.name,
                code: err.code,
            }
        } else if (err instanceof Error) {
            ctx.status = 500
            ctx.body = {
                message: err.message,
                name: err.name ?? 'UnknownError',
                code: ctx.status,
            }
        } else {
            ctx.status = 500
            ctx.body = {
                message: err.message ?? err,
                name: 'UnknownError',
                code: ctx.status,
            }
        }
    }
}

class CustomError extends Error {
    code: number
    type: string

    constructor(message: string, code: number, name: string) {
        super(message)
        this.name = name ?? 'CustomError'
        this.code = code
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500, 'InternalServerError')
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400, 'BadRequestError')
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message = 'UnauthorizedError') {
        super(message, 401, message)
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404, 'NotFoundError')
    }
}

export class UnknownError extends InternalServerError {
    constructor() {
        super('Unknown Error')
    }
}
