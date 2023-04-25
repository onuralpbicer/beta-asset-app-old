import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { SETTINGS_FEATURE_KEY, reducer } from './settings.reducer'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(SETTINGS_FEATURE_KEY, reducer),
    ],
})
export class SettingsModule {}
