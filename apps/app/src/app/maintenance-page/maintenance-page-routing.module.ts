import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MaintenancePageComponent } from './maintenance-page.component'

const routes: Routes = [
    {
        path: 'new',
        component: MaintenancePageComponent,
    },
    {
        path: '**',
        redirectTo: 'new',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}
