import { createAction, props } from '@ngrx/store'

export const login = createAction(
    '[Login] Login',
    props<{ email: string; password: string }>(),
)

export const loginSuccess = createAction(
    '[Login] Login Success',
    props<{ user_id: string; isAdmin: boolean }>(),
)

export const loginFail = createAction('[Login] Login Fail')
