import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { ILoginState } from '../login/login.reducer'
import { logout } from '../login/login.actions'
import { MenuController } from '@ionic/angular'

@Component({
    selector: 'beta-asset-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
    @Input() contentId!: string

    constructor(
        private store: Store<ILoginState>,
        private menuController: MenuController,
    ) {}

    logout() {
        this.store.dispatch(logout())
        this.menuController.close()
    }
}
