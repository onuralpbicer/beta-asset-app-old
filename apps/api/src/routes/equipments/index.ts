import Router from 'koa-router'
import getEquipmentDetails from './getEquipmentDetails'
import getMaintenanceSummaryForEquipment from './getMaintenanceSummary'

const router = new Router({
    prefix: '/equipments/:id',
})

router.get('/', getEquipmentDetails)
router.get('/maintenances', getMaintenanceSummaryForEquipment)

export default router
