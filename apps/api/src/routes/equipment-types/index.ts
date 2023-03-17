import Router from 'koa-router'
import getEquipmentTypes from './getEquipmentTypes'

const router = new Router({
    prefix: '/equipment-types',
})

router.get('/', getEquipmentTypes)

export default router
