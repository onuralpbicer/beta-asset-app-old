import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EquipmentPageComponent } from './equipment-page.component'

const routes: Routes = [
    {
        path: ':id',
        component: EquipmentPageComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EquipmentPageRoutingModule {}
