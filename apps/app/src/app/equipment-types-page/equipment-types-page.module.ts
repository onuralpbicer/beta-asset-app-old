import { NgModule } from '@angular/core'
import { EquipmentTypesPageComponent } from './equipment-types-page.component'
import { EquipmentTypesPageRoutingModule } from './equipment-types-page.routing-module'
import { EquipmentTypesService } from './equipment-types-page.service'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'

@NgModule({
    declarations: [EquipmentTypesPageComponent],
    imports: [EquipmentTypesPageRoutingModule, IonicModule, CommonModule],
    providers: [EquipmentTypesService],
})
export class EquipmentsTypesPageModule {}
