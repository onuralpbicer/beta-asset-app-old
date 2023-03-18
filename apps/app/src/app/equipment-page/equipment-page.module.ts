import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentPageComponent } from './equipment-page.component'
import { EquipmentPageRoutingModule } from './equipment-page.routing-module'
import { IonicModule } from '@ionic/angular'
import { EquipmentService } from './equipment.service'

@NgModule({
    declarations: [EquipmentPageComponent],
    imports: [CommonModule, EquipmentPageRoutingModule, IonicModule],
    providers: [EquipmentService],
})
export class EquipmentPageModule {}
