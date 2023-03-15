import Joi from 'joi'
import { BadRequestError } from '../middleware/error'

export async function validateBody<T>(
    body: unknown,
    validator: Joi.Schema<T>,
): Promise<T> {
    try {
        return await validator.validateAsync(body)
    } catch (err) {
        throw new BadRequestError(err.message.replaceAll('"', ''))
    }
}
