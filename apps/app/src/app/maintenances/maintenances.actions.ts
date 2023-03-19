import { createAction, props } from '@ngrx/store'
import { ID, IMaintenanceDetails, IMaintenanceSummary } from '../models/model'

export const loadMaintenanceList = createAction(
    '[Maintenances] Load Maintenance List',
    props<{ equipment_id: ID }>(),
)

export const loadMaintenanceListSuccess = createAction(
    '[Maintenances] Load Maintenance List Success',
    props<{ maintenances: IMaintenanceSummary[] }>(),
)

export const loadMaintenanceListFail = createAction(
    '[Maintenances] Load Maintenance List Fail',
)

export const loadMaintenanceDetails = createAction(
    '[Maintenances] Load Details',
    props<{ maintenance_id: ID }>(),
)

export const loadMaintenanceDetailsSuccess = createAction(
    '[Maintenances] Load Details Success',
    props<{ maintenance: IMaintenanceDetails }>(),
)

export const loadMaintenanceDetailsFail = createAction(
    '[Maintenances] Load Details Fail',
    props<{ maintenance_id: ID }>(),
)
