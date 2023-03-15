import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import {
    createReducer,
    on,
    Action,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store'

import * as LoginActions from './login.actions'

export const LOGIN_FEATURE_KEY = 'login'

export interface ILoginState {
    user_id?: string
    isAdmin?: boolean
    loading: boolean
}

export const initialLoginState: ILoginState = {
    user_id: undefined,
    isAdmin: undefined,
    loading: false,
}

const reducer = createReducer(
    initialLoginState,
    on(LoginActions.login, (state) => ({ ...state, loading: true })),
    on(LoginActions.loginSuccess, (state, action) => ({
        ...state,
        ...action,
        loading: false,
    })),
    on(LoginActions.loginFail, (state) => ({
        ...state,
        ...initialLoginState,
    })),
)

const loginSelector = createFeatureSelector<ILoginState>(LOGIN_FEATURE_KEY)

export const selectUserInfo = createSelector(loginSelector, (state) => ({
    isAdmin: state.isAdmin,
    user_id: state.user_id,
}))

export const selectUserID = createSelector(
    loginSelector,
    (state) => state.user_id,
)

export const selectLoginLoading = createSelector(
    loginSelector,
    (state) => state.loading,
)

export function loginReducer(state: ILoginState | undefined, action: Action) {
    return reducer(state, action)
}
