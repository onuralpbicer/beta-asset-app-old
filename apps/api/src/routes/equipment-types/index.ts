import Router from 'koa-router'
import getEquipmentTypes from './getEquipmentTypes'
import getEquipmentsForType from './getEquipmentsForType'
import { BadRequestError } from '../../middleware/error'

const router = new Router({
    prefix: '/equipment-types',
})

router.get('/', getEquipmentTypes)

const idRouter = new Router({
    prefix: '/:id',
})

idRouter.use(async (ctx, next) => {
    const id = ctx.params.id
    if (!id) throw new BadRequestError('Equipment Type ID is required')

    await next()
})
idRouter.get('/equipments', getEquipmentsForType)

router.use(idRouter.routes())

export default router
