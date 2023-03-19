import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import environment from '../../environment/environment'
import { map, timer } from 'rxjs'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import jwtDecode from 'jwt-decode'
import { logout } from './login.actions'

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http
            .post<{ auth_token: string }>(environment.apiUrl + '/auth', {
                email,
                password,
            })
            .pipe(
                map((value) => ({
                    ...jwt_decode<{ user_id: string; isAdmin: boolean }>(
                        value.auth_token,
                    ),
                    auth_token: value.auth_token,
                })),
            )
    }

    isTokenExpired(authToken: JwtPayload | string): boolean {
        const payload =
            typeof authToken === 'string'
                ? jwtDecode<JwtPayload>(authToken)
                : authToken
        const now = new Date()
        const expDate = new Date((payload.exp ?? 0) * 1000)

        return now > expDate
    }

    setupExpiry(authToken: JwtPayload | string) {
        const payload =
            typeof authToken === 'string'
                ? jwtDecode<JwtPayload>(authToken)
                : authToken

        const expDate = new Date((payload.exp ?? 0) * 1000)

        return timer(expDate).pipe(map(() => logout()))
    }
}
