import { NgModule } from '@angular/core'
import { LoginService } from './login.service'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromLogin from './login.reducer'
import { LoginEffects } from './login.effects'

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature(
            fromLogin.LOGIN_FEATURE_KEY,
            fromLogin.loginReducer,
        ),
        EffectsModule.forFeature([LoginEffects]),
    ],
    providers: [LoginService],
})
export class LoginModule {}
