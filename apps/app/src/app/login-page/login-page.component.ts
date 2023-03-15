import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { ILoginState } from '../login/login.reducer'
import { login } from '../login/login.actions'

@Component({
    selector: 'beta-asset-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    public form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    })

    constructor(
        private fb: FormBuilder,
        private loginStore: Store<ILoginState>,
    ) {}

    ngOnInit(): void {}

    login() {
        const { email, password } = this.form.value
        console.log(this.form.value)
        if (!email || !password) return

        this.loginStore.dispatch(login({ email, password }))
    }
}
