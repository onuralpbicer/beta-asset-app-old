import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { createReducer, on, Action } from '@ngrx/store'

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

export function loginReducer(state: ILoginState | undefined, action: Action) {
    return reducer(state, action)
}
