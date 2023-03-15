import { NgModule } from '@angular/core'
import { LoginService } from './login.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    imports: [HttpClientModule],
    providers: [LoginService],
})
export class LoginModule {}
