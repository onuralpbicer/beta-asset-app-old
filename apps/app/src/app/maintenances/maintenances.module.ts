import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MAINTENANCES_FEATURE_KEY, reducer } from './maintenances.reducer'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { MaintenancesEffects } from './maintenances.effects'
import { MaintenanecesService } from './maintenances.service'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(MAINTENANCES_FEATURE_KEY, reducer),
        EffectsModule.forFeature([MaintenancesEffects]),
    ],
    providers: [MaintenanecesService],
})
export class MaintenancesModule {}
