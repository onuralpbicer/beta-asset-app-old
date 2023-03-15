import { NgModule } from '@angular/core'
import { LoginPageComponent } from './login-page.component'
import { LoginPageRoutingModule } from './login-page.routing.module'
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginModule } from '../login/login.module'

@NgModule({
    declarations: [LoginPageComponent],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        LoginPageRoutingModule,
        LoginModule,
    ],
})
export class LoginPageModule {}
