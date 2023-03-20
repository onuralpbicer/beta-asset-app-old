import Router from 'koa-router'
import getEquipmentDetails from './getEquipmentDetails'
import getMaintenanceSummaryForEquipment from './getMaintenanceSummary'
import getMaintenanceFields from './getMaintenanceFields'

const router = new Router({
    prefix: '/equipments/:id',
})

router.get('/', getEquipmentDetails)
router.get('/maintenances', getMaintenanceSummaryForEquipment)
router.get('/maintenance-fields', getMaintenanceFields)

export default router
