import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { ILoginState, selectAuthToken } from '../login/login.reducer'
import { Observable, mergeMap, take } from 'rxjs'

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private loginStore: Store<ILoginState>) {}

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return this.loginStore.select(selectAuthToken).pipe(
            take(1),
            mergeMap((authToken) => {
                const authReq = req.clone({
                    headers: req.headers.set(
                        'Authorization',
                        `Bearer ${authToken}`,
                    ),
                })

                return next.handle(authReq)
            }),
        )
    }
}
