import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import environment from '../../environment/environment'
import { catchError, take, tap } from 'rxjs'
import jwt_decode from 'jwt-decode'

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
                take(1),
                tap((value) => console.log(jwt_decode(value.auth_token))),
                // catchError((err) => {
                //     console.log(err)
                // }),
            )
            .subscribe()
    }
}
