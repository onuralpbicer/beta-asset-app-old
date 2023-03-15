import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginModule } from './login/login.module'
import { authGuard } from './login/login.guard'

const routes: Routes = [
    {
        path: 'home',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./home-page/home-page.module').then(
                (m) => m.HomePageModule,
            ),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./login-page/login-page.module').then(
                (m) => m.LoginPageModule,
            ),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes), LoginModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
