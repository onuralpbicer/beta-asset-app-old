import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'

import * as LoginActions from './login.actions'

import { switchMap, catchError, of, map, tap } from 'rxjs'
import { LoginService } from './login.service'
import { Store } from '@ngrx/store'
import { ILoginState } from './login.reducer'
import { NavController } from '@ionic/angular'

@Injectable()
export class LoginEffects {
    private actions$ = inject(Actions)

    constructor(
        private service: LoginService,
        private router: NavController,
        private store: Store<ILoginState>,
    ) {}

    public login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.login),
            switchMap(({ email, password }) =>
                this.service.login(email, password).pipe(
                    map(({ user_id, isAdmin, auth_token }) =>
                        LoginActions.loginSuccess({
                            user_id,
                            isAdmin,
                            auth_token,
                        }),
                    ),
                    catchError((error) => {
                        console.log(error)
                        return of(LoginActions.loginFail())
                    }),
                ),
            ),
        ),
    )

    public loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LoginActions.loginSuccess),
                tap(() => {
                    this.router.navigateForward('/home')
                }),
            ),
        {
            dispatch: false,
        },
    )

    public logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LoginActions.logout),
                tap(() => {
                    this.router.navigateBack('/login')
                }),
            ),
        { dispatch: false },
    )
}
