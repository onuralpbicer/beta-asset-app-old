import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Loading, PartialOmit } from '../helpers/types'
import { ID, IMaintenanceDetails } from '../models/model'
import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store'
import {
    loadMaintenanceDetails,
    loadMaintenanceDetailsFail,
    loadMaintenanceDetailsSuccess,
    loadMaintenanceList,
    loadMaintenanceListFail,
    loadMaintenanceListSuccess,
} from './maintenances.actions'
import { login } from '../login/login.actions'

export const MAINTENANCES_FEATURE_KEY = 'maintenances'

export type IMaintenanceEntity = Loading<PartialOmit<IMaintenanceDetails, 'id'>>

const adapter = createEntityAdapter<IMaintenanceEntity>()

export interface IMaintenanceState {
    loading: boolean
    entities: EntityState<IMaintenanceEntity>
}

const initialState: IMaintenanceState = {
    loading: false,
    entities: adapter.getInitialState(),
}

export const reducer = createReducer(
    initialState,
    on(loadMaintenanceList, () => ({
        entities: adapter.getInitialState(),
        loading: true,
    })),
    on(loadMaintenanceListSuccess, (state, { maintenances }) => ({
        entities: adapter.upsertMany(
            maintenances.map((maintenance) => ({
                ...maintenance,
                loading: false,
            })),
            state.entities,
        ),
        loading: false,
    })),
    on(loadMaintenanceListFail, (state) => ({
        ...state,
        loading: false,
    })),
    on(loadMaintenanceDetails, (state, { maintenance_id }) => ({
        ...state,
        entities: adapter.upsertOne(
            { loading: true, id: maintenance_id },
            state.entities,
        ),
    })),
    on(loadMaintenanceDetailsSuccess, (state, { maintenance }) => ({
        ...state,
        entities: adapter.upsertOne(
            { loading: false, ...maintenance },
            state.entities,
        ),
    })),
    on(loadMaintenanceDetailsFail, (state, { maintenance_id }) => ({
        ...state,
        entities: adapter.upsertOne(
            { loading: true, id: maintenance_id },
            state.entities,
        ),
    })),
    on(login, () => initialState),
)

const selector = createFeatureSelector<IMaintenanceState>(
    MAINTENANCES_FEATURE_KEY,
)

const { selectAll } = adapter.getSelectors()

const selectEntities = createSelector(selector, (state) => state.entities)

export const selectMaintenanceList = (equipment_id: ID) =>
    createSelector(selectEntities, (state) =>
        selectAll(state).filter(
            (maintenance) => maintenance.equipment_id === equipment_id,
        ),
    )

export const selectMaintenanceListLoading = createSelector(
    selector,
    (state) => state.loading,
)

export const selectMaintenance = (id: ID) =>
    createSelector(selectEntities, (entity) => entity.entities[id])
