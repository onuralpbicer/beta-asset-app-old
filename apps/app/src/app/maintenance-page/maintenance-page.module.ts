import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaintenancePageComponent } from './maintenance-page.component'
import { IonicModule } from '@ionic/angular'
import { MaintenancePageRoutingModule } from './maintenance-page-routing.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [MaintenancePageComponent],
    imports: [
        CommonModule,
        IonicModule,
        MaintenancePageRoutingModule,
        ReactiveFormsModule,
    ],
})
export class MaintenancePageModule {}
