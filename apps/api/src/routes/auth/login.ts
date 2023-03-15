import { Middleware } from 'koa'
import Joi from 'joi'
import { validateBody } from '../../shared/validation'
import { prisma } from '../../shared/database'
import { InternalServerError, UnauthorizedError } from '../../middleware/error'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface LoginPayload {
    email: string
    password: string
}

const validator = Joi.object<LoginPayload>({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const invalidPassword = 'Invalid Password'
const noLogin = 'Could not log in'

const login: Middleware = async (ctx) => {
    const { email, password } = await validateBody(ctx.request.body, validator)

    try {
        const userCandidate = await prisma.users.findFirstOrThrow({
            select: {
                password_hash: true,
                id: true,
            },
            where: {
                email,
            },
        })

        // password creation
        // const salt = await bcrypt.genSalt(10)
        // const password_hash = await bcrypt.compare(password, userCandidate.password_hash)

        const result = await bcrypt.compare(
            password,
            userCandidate.password_hash,
        )

        if (!result) throw new Error(invalidPassword)

        const auth_token = jwt.sign(
            { user_id: userCandidate.id },
            process.env.JWT_TOKEN,
            {
                expiresIn: '24h',
            },
        )

        ctx.body = {
            auth_token,
        }
    } catch (err) {
        if (err.message.includes("Can't reach database"))
            throw new InternalServerError('Database Error')
        else if (err.message === 'No Users found')
            throw new UnauthorizedError(noLogin)
        else if (err.message === 'invalidPassword')
            throw new UnauthorizedError(noLogin)
        else throw err
    }
}

export default login
