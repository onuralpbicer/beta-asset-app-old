import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { IEquipmentDetails } from '../models/model'
import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store'
import { login } from '../login/login.actions'
import {
    loadEquipmentList,
    loadEquipmentListFail,
    loadEquipmentListSuccess,
} from './equipments.actions'
import { PartialOmit } from '../helpers/types'

export const EQUIPMENTS_FEATURE_KEY = 'equipments'

type Entity = PartialOmit<IEquipmentDetails, 'id'> & { loading: boolean }

const adapter = createEntityAdapter<Entity>()

export interface IEquipmentsState {
    loading: boolean
    entities: EntityState<Entity>
}

const initialState: IEquipmentsState = {
    loading: false,
    entities: adapter.getInitialState(),
}

export const reducer = createReducer(
    initialState,
    on(loadEquipmentList, () => ({
        entities: adapter.getInitialState(),
        loading: true,
    })),
    on(loadEquipmentListSuccess, (state, { equipments }) => ({
        entities: adapter.upsertMany(
            equipments.map((equipment) => ({ ...equipment, loading: false })),
            state.entities,
        ),
        loading: false,
    })),
    on(loadEquipmentListFail, (state) => ({
        ...state,
        loading: false,
    })),
    on(login, () => initialState),
)

const selector = createFeatureSelector<IEquipmentsState>(EQUIPMENTS_FEATURE_KEY)

const { selectAll } = adapter.getSelectors()

const selectEntities = createSelector(selector, (state) => state.entities)

export const selectEquipmentList = createSelector(selectEntities, selectAll)

export const selectEquipmentListLoading = createSelector(
    selector,
    (state) => state.loading,
)
