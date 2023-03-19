import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentPageComponent } from './equipment-page.component'
import { EquipmentPageRoutingModule } from './equipment-page.routing-module'
import { IonicModule } from '@ionic/angular'
import { EquipmentsModule } from '../equipments/equipments.module'
import { MaintenancesModule } from '../maintenances/maintenances.module'
import { MaintenanceSummaryComponent } from './maintenance-summary/maintenance-summary.component'

@NgModule({
    declarations: [EquipmentPageComponent, MaintenanceSummaryComponent],
    imports: [
        CommonModule,
        EquipmentPageRoutingModule,
        IonicModule,
        EquipmentsModule,
        MaintenancesModule,
    ],
})
export class EquipmentPageModule {}
