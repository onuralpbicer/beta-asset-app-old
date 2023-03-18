import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, Observable } from 'rxjs'
import { ID } from '../models/model'
import { Store } from '@ngrx/store'
import {
    IEquipmentEntity,
    IEquipmentsState,
    selectEquipment,
} from '../equipments/equipments.reducer'
import { loadEquipmentDetails } from '../equipments/equipments.actions'

@Component({
    selector: 'beta-asset-equipment-page',
    templateUrl: './equipment-page.component.html',
    styleUrls: ['./equipment-page.component.scss'],
})
export class EquipmentPageComponent implements OnInit {
    public equipment$!: Observable<IEquipmentEntity | undefined>
    public loading$!: Observable<boolean>

    public id$!: Observable<ID>

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<IEquipmentsState>,
    ) {}

    ngOnInit(): void {
        this.id$ = this.activatedRoute.params.pipe(
            map((params) => params['id']),
        )

        this.equipment$ = this.id$.pipe(
            switchMap((id) => this.store.select(selectEquipment(id))),
        )

        this.loading$ = this.equipment$.pipe(
            map((equipment) => equipment?.loading || false),
        )

        this.loadEquipmentDetails()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refresh(event: any) {
        this.loadEquipmentDetails(() => event.target.complete())
    }

    loadEquipmentDetails(onComplete?: () => void) {
        this.id$.subscribe((equipment_id) => {
            this.store.dispatch(loadEquipmentDetails({ equipment_id }))
        })
        onComplete && onComplete()
    }
}
