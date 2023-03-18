import Router from 'koa-router'
import getEquipmentDetails from './getEquipmentDetails'

const router = new Router({
    prefix: '/equipments',
})

router.get('/:id', getEquipmentDetails)

export default router
