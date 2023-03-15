import { Component, OnInit, isDevMode } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { LoginService } from '../login/login.service'

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

    constructor(private fb: FormBuilder, private loginService: LoginService) {}

    ngOnInit(): void {}

    login() {
        const { email, password } = this.form.value
        console.log(this.form.value)
        if (!email || !password) return

        this.loginService.login(email, password)
    }
}
