import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store'
import { IEquipmentTypes } from '../models/model'
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import {
    loadEquipmentTypes,
    loadEquipmentTypesFail,
    loadEquipmentTypesSuccess,
} from './equipment-types.actions'

export const EQUIPMENT_TYPES_FEATURE_KEY = 'equipment_types'

const adapter = createEntityAdapter<IEquipmentTypes>()

export interface IEquipmentTypesState {
    loading: boolean
    entities: EntityState<IEquipmentTypes>
}

const initialState: IEquipmentTypesState = {
    loading: false,
    entities: adapter.getInitialState(),
}

export const reducer = createReducer(
    initialState,
    on(loadEquipmentTypes, () => ({
        entities: adapter.getInitialState(),
        loading: true,
    })),
    on(loadEquipmentTypesSuccess, (state, { equipmentTypes }) => ({
        entities: adapter.addMany(equipmentTypes, state.entities),
        loading: false,
    })),
    on(loadEquipmentTypesFail, (state) => ({
        ...state,
        loading: false,
    })),
)

const selector = createFeatureSelector<IEquipmentTypesState>(
    EQUIPMENT_TYPES_FEATURE_KEY,
)

export const selectEquipmentTypesLoading = createSelector(
    selector,
    (state) => state.loading,
)

const selectEntities = createSelector(selector, (state) => state.entities)

const { selectAll } = adapter.getSelectors()

export const selectEquipmentTypes = createSelector(selectEntities, selectAll)
