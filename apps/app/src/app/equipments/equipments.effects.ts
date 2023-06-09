import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, retry, map, catchError, of } from 'rxjs'
import { devDelay } from '../helpers/observable'
import { EquipmentsService } from './equipments.service'
import {
    loadEquipmentDetails,
    loadEquipmentDetailsFail,
    loadEquipmentDetailsSuccess,
    loadEquipmentList,
    loadEquipmentListFail,
    loadEquipmentListSuccess,
} from './equipments.actions'

@Injectable()
export class EquipmentsEffects {
    private actions$ = inject(Actions)

    constructor(private service: EquipmentsService) {}

    public loadEquipmentsList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEquipmentList),
            switchMap(({ equipment_type_id }) =>
                this.service.getEquipmentList(equipment_type_id).pipe(
                    retry(3),
                    devDelay(),
                    map((equipments) =>
                        loadEquipmentListSuccess({ equipments }),
                    ),
                    catchError((err) => {
                        console.log(err)
                        return of(loadEquipmentListFail())
                    }),
                ),
            ),
        ),
    )

    public loadEquipmentDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEquipmentDetails),
            switchMap(({ equipment_id }) =>
                this.service.getEquipmentDetails(equipment_id).pipe(
                    retry(3),
                    // devDelay(),
                    map((equipment) =>
                        loadEquipmentDetailsSuccess({ equipment }),
                    ),
                    catchError((err) => {
                        console.log(err)
                        return of(loadEquipmentDetailsFail({ equipment_id }))
                    }),
                ),
            ),
        ),
    )
}
