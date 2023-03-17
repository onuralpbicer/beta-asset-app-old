import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import environment from '../../environment/environment'
import { map } from 'rxjs'
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
                map((value) => ({
                    ...jwt_decode<{ user_id: string; isAdmin: boolean }>(
                        value.auth_token,
                    ),
                    auth_token: value.auth_token,
                })),
            )
    }
}
