import { createAction, props } from '@ngrx/store'

export const loginInit = createAction('[Login] Init')

export const login = createAction(
    '[Login] Login',
    props<{ email: string; password: string }>(),
)

export const loginSuccess = createAction(
    '[Login] Login Success',
    props<{ user_id: string; isAdmin: boolean; auth_token: string }>(),
)

export const loginFail = createAction('[Login] Login Fail')

export const logout = createAction('[Login] Logout')
