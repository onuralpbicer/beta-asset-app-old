import { NgModule } from '@angular/core'
import { EquipmentTypesPageComponent } from './equipment-types.component'
import { EquipmentTypesPageRoutingModule } from './equipment-types.routing.module'
import { EquipmentTypesService } from './equipment-types.service'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'

@NgModule({
    declarations: [EquipmentTypesPageComponent],
    imports: [EquipmentTypesPageRoutingModule, IonicModule, CommonModule],
    providers: [EquipmentTypesService],
})
export class HomePageModule {}
