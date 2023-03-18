import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentTypesService } from './equipment-types.service'
import { StoreModule } from '@ngrx/store'
import { EQUIPMENT_TYPES_FEATURE_KEY, reducer } from './equipment-types.reducer'
import { EffectsModule } from '@ngrx/effects'
import { EquipmentTypesEffects } from './equipment-types.effects'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(EQUIPMENT_TYPES_FEATURE_KEY, reducer),
        EffectsModule.forFeature([EquipmentTypesEffects]),
    ],
    providers: [EquipmentTypesService],
})
export class EquipmentTypesModule {}
