import Router from 'koa-router'
import getMaintenanceDetails from './getMaintenanceDetails'

const router = new Router({
    prefix: '/maintenances',
})

router.get('/:id', getMaintenanceDetails)

export default router
