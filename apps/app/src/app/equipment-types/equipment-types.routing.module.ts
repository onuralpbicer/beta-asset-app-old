import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EquipmentTypesPageComponent } from './equipment-types.component'

const routes: Routes = [
    {
        path: '',
        component: EquipmentTypesPageComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EquipmentTypesPageRoutingModule {}
