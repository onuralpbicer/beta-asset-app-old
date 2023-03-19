import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SideMenuComponent } from './side-menu.component'
import { IonicModule } from '@ionic/angular'
import { LoginModule } from '../login/login.module'

@NgModule({
    declarations: [SideMenuComponent],
    imports: [CommonModule, IonicModule, LoginModule],
    exports: [SideMenuComponent],
})
export class SideMenuModule {}
