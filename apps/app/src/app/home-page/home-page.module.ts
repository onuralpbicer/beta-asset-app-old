import { NgModule } from '@angular/core'
import { HomePageComponent } from './home-page.component'
import { HomePageRoutingModule } from './home-page.routing.module'
import { EquipmentTypesService } from './equipment-types.service'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'

@NgModule({
    declarations: [HomePageComponent],
    imports: [HomePageRoutingModule, IonicModule, CommonModule],
    providers: [EquipmentTypesService],
})
export class HomePageModule {}
