import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects'

import * as LoginActions from './login.actions'

import { switchMap, catchError, of, map, tap, filter } from 'rxjs'
import { LoginService } from './login.service'
import { Action, Store } from '@ngrx/store'
import { ILoginState, selectAuthToken } from './login.reducer'
import { NavController } from '@ionic/angular'
import jwtDecode, { JwtPayload } from 'jwt-decode'

@Injectable()
export class LoginEffects implements OnInitEffects {
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

    public test$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.loginInit),
            switchMap(() =>
                // Not take(1)'ing here on purpose since I want this to always run when auth token changes
                this.store.select(selectAuthToken).pipe(
                    filter(Boolean),
                    map((authToken) => jwtDecode<JwtPayload>(authToken)),
                    switchMap((decoded) =>
                        this.service.isTokenExpired(decoded)
                            ? of(LoginActions.logout())
                            : this.service.setupExpiry(decoded),
                    ),
                    catchError(() => of(LoginActions.logout())),
                ),
            ),
        ),
    )

    ngrxOnInitEffects(): Action {
        return LoginActions.loginInit()
    }
}
