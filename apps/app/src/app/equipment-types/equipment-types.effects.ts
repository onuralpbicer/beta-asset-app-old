import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EquipmentTypesService } from './equipment-types.service'
import {
    loadEquipmentTypes,
    loadEquipmentTypesFail,
    loadEquipmentTypesSuccess,
} from './equipment-types.actions'
import { catchError, map, of, retry, switchMap } from 'rxjs'
import { devDelay } from '../helpers/observable'

@Injectable()
export class EquipmentTypesEffects {
    private actions$ = inject(Actions)

    constructor(private equipmentTypesService: EquipmentTypesService) {}

    public loadEquipmentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEquipmentTypes),
            switchMap(() =>
                this.equipmentTypesService.getEquipmentTypes().pipe(
                    retry(3),
                    devDelay(),
                    map((equipmentTypes) =>
                        loadEquipmentTypesSuccess({ equipmentTypes }),
                    ),
                    catchError((err) => {
                        console.log(err)
                        return of(loadEquipmentTypesFail())
                    }),
                ),
            ),
        ),
    )
}
