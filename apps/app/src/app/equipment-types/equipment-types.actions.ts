import { createAction, props } from '@ngrx/store'
import { IEquipmentTypes } from '../models/model'

export const loadEquipmentTypes = createAction('[Equipment Types] Load')

export const loadEquipmentTypesSuccess = createAction(
    '[Equipment Types] Load Success',
    props<{ equipmentTypes: IEquipmentTypes[] }>(),
)

export const loadEquipmentTypesFail = createAction(
    '[Equipment Types] Load Fail',
)
