import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentsPageComponent } from './equipments-page.component'
import { IonicModule } from '@ionic/angular'
import { EquipmentsPageRoutingModule } from './equipments-page-routing.module'

@NgModule({
    declarations: [EquipmentsPageComponent],
    imports: [CommonModule, IonicModule, EquipmentsPageRoutingModule],
})
export class EquipmentsPageModule {}
