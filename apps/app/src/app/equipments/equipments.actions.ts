import { createAction, props } from '@ngrx/store'
import { ID, IEquipmentDetails, IEquipmentSummary } from '../models/model'

export const loadEquipmentList = createAction(
    '[Equipments] Load Summarized List',
    props<{ equipment_type_id: ID }>(),
)

export const loadEquipmentListSuccess = createAction(
    '[Equipments] Load Summarized List Success',
    props<{ equipments: IEquipmentSummary[] }>(),
)

export const loadEquipmentListFail = createAction(
    '[Equipments] Load Summarized List Fail',
)

export const loadEquipmentDetails = createAction(
    '[Equipments] Load Details',
    props<{ equipment_id: ID }>(),
)

export const loadEquipmentDetailsSuccess = createAction(
    '[Equipments] Load Details Success',
    props<{ equipment: IEquipmentDetails }>(),
)

export const loadEquipmentDetailsFail = createAction(
    '[Equipments] Load Details Fail',
    props<{ equipment_id: ID }>(),
)
