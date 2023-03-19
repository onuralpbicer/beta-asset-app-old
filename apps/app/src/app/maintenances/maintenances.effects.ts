import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EquipmentsService } from '../equipments/equipments.service'
import { loadEquipmentDetails } from '../equipments/equipments.actions'
import { pipe, map, switchMap, retry, catchError, of } from 'rxjs'
import {
    loadMaintenanceDetails,
    loadMaintenanceDetailsFail,
    loadMaintenanceDetailsSuccess,
    loadMaintenanceList,
    loadMaintenanceListFail,
    loadMaintenanceListSuccess,
} from './maintenances.actions'
import { devDelay } from '../helpers/observable'
import { MaintenanecesService } from './maintenances.service'

@Injectable()
export class MaintenancesEffects {
    private actions$ = inject(Actions)

    constructor(
        private equipmentsService: EquipmentsService,
        private maintenancesService: MaintenanecesService,
    ) {}

    public loadWhenEquipmentDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEquipmentDetails),
            pipe(
                map(({ equipment_id }) =>
                    loadMaintenanceList({ equipment_id }),
                ),
            ),
        ),
    )

    public loadMaintenanceList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMaintenanceList),
            pipe(
                switchMap(({ equipment_id }) =>
                    this.equipmentsService
                        .getMaintenanceList(equipment_id)
                        .pipe(
                            retry(3),
                            devDelay(),
                            map((maintenances) =>
                                loadMaintenanceListSuccess({ maintenances }),
                            ),
                            catchError((err) => {
                                console.log(err)
                                return of(loadMaintenanceListFail())
                            }),
                        ),
                ),
            ),
        ),
    )

    public loadMaintenanceDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMaintenanceDetails),
            switchMap(({ maintenance_id }) =>
                this.maintenancesService
                    .getMaintenanceDetails(maintenance_id)
                    .pipe(
                        retry(3),
                        devDelay(),
                        map((maintenance) =>
                            loadMaintenanceDetailsSuccess({ maintenance }),
                        ),
                        catchError((err) => {
                            console.log(err)
                            return of(
                                loadMaintenanceDetailsFail({ maintenance_id }),
                            )
                        }),
                    ),
            ),
        ),
    )
}
