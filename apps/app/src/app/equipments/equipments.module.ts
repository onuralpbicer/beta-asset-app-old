import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EQUIPMENTS_FEATURE_KEY, reducer } from './equipments.reducer'
import { EffectsModule } from '@ngrx/effects'
import { EquipmentsEffects } from './equipments.effects'
import { EquipmentsService } from './equipments.service'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(EQUIPMENTS_FEATURE_KEY, reducer),
        EffectsModule.forFeature([EquipmentsEffects]),
    ],
    providers: [EquipmentsService],
})
export class EquipmentsModule {}
