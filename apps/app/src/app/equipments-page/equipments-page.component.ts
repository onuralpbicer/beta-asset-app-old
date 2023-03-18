import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
    BehaviorSubject,
    Observable,
    debounce,
    map,
    of,
    switchMap,
    take,
} from 'rxjs'
import { IEquipmentSummary } from '../models/model'
import { SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular'
import { Store } from '@ngrx/store'
import {
    IEquipmentsState,
    selectEquipmentList,
    selectEquipmentListLoading,
} from '../equipments/equipments.reducer'
import { loadEquipmentList } from '../equipments/equipments.actions'
import { PartialPick } from '../helpers/types'

@Component({
    selector: 'beta-asset-equipments-page',
    templateUrl: './equipments-page.component.html',
    styleUrls: ['./equipments-page.component.scss'],
})
export class EquipmentsPageComponent implements OnInit, ViewWillEnter {
    public equipments$!: Observable<PartialPick<IEquipmentSummary, 'name'>[]>
    public loading$!: Observable<boolean>

    public search: BehaviorSubject<string> = new BehaviorSubject('')

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<IEquipmentsState>,
    ) {}

    ionViewWillEnter() {
        this.search.next('')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refresh(event: any) {
        this.loadEquipments(() => event.target.complete())
    }

    loadEquipments(onComplete?: () => void) {
        this.search.next('')

        this.activatedRoute.params
            .pipe(
                take(1),
                map((params) => params['id']),
            )
            .subscribe((equipment_type_id) => {
                this.store.dispatch(loadEquipmentList({ equipment_type_id }))
            })
        onComplete && onComplete()
    }

    getRouterLink(id: string) {
        return `/equipment/${id}`
    }

    onSearchChange(event: unknown) {
        this.search.next((event as SearchbarCustomEvent).detail.value ?? '')
    }

    ngOnInit(): void {
        this.equipments$ = this.store.select(selectEquipmentList).pipe(
            switchMap((equipments) =>
                this.search.pipe(
                    debounce(() => of(1000)),
                    map((search) => search.toLowerCase()),
                    map((search) =>
                        equipments.filter((equipment) =>
                            equipment.name?.toLowerCase().includes(search),
                        ),
                    ),
                ),
            ),
        )

        this.loading$ = this.store.select(selectEquipmentListLoading)

        this.loadEquipments()
    }
}
