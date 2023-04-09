import Router from 'koa-router'
import getEquipmentDetails from './getEquipmentDetails'
import getMaintenanceSummaryForEquipment from './getMaintenanceSummary'
import postMaintenance from './postMaintenance'

const router = new Router({
    prefix: '/equipments/:id',
})

router.get('/', getEquipmentDetails)
router.get('/maintenances', getMaintenanceSummaryForEquipment)
router.post('/maintenances', postMaintenance)

export default router
