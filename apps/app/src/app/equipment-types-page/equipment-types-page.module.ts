import { NgModule } from '@angular/core'
import { EquipmentTypesPageComponent } from './equipment-types-page.component'
import { EquipmentTypesPageRoutingModule } from './equipment-types-page.routing-module'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { EquipmentTypesModule } from '../equipment-types/equipment-types.module'

@NgModule({
    declarations: [EquipmentTypesPageComponent],
    imports: [
        EquipmentTypesPageRoutingModule,
        IonicModule,
        CommonModule,
        EquipmentTypesModule,
    ],
})
export class EquipmentsTypesPageModule {}
