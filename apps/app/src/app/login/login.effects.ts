import { Injectable, inject } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'

import * as LoginActions from './login.actions'

import { switchMap, catchError, of, map, tap } from 'rxjs'
import { LoginService } from './login.service'
import { Router } from '@angular/router'

@Injectable()
export class LoginEffects {
    private actions$ = inject(Actions)

    constructor(private service: LoginService, private router: Router) {}

    public login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.login),
            switchMap(({ email, password }) =>
                this.service.login(email, password).pipe(
                    map(({ user_id, isAdmin }) =>
                        LoginActions.loginSuccess({ user_id, isAdmin }),
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
                    this.router.navigateByUrl('/home')
                }),
            ),
        {
            dispatch: false,
        },
    )
}
