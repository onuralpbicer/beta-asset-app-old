import { createAction, props } from '@ngrx/store'
import { ID, IEquipmentSummary } from '../models/model'

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
