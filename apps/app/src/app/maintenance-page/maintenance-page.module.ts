import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaintenancePageComponent } from './maintenance-page.component'
import { IonicModule } from '@ionic/angular'
import { MaintenancePageRoutingModule } from './maintenance-page-routing.module'

@NgModule({
    declarations: [MaintenancePageComponent],
    imports: [CommonModule, IonicModule, MaintenancePageRoutingModule],
})
export class MaintenancePageModule {}
