import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginModule } from './login/login.module'
import { authGuard, loggedInGuard } from './login/login.guard'

const routes: Routes = [
    {
        path: 'equipment-types',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./equipment-types/equipment-types.module').then(
                (m) => m.HomePageModule,
            ),
    },
    {
        path: 'login',
        canActivate: [loggedInGuard],
        loadChildren: () =>
            import('./login-page/login-page.module').then(
                (m) => m.LoginPageModule,
            ),
    },
    {
        path: 'home',
        redirectTo: 'equipment-types',
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes), LoginModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
