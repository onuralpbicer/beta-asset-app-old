import { Component, OnInit } from '@angular/core'
import { ID, IEquipmentTypes } from '../models/model'
import { SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular'
import { Store } from '@ngrx/store'
import {
    IEquipmentTypesState,
    selectEquipmentTypes,
    selectEquipmentTypesLoading,
} from '../equipment-types/equipment-types.reducer'
import { loadEquipmentTypes } from '../equipment-types/equipment-types.actions'
import { BehaviorSubject, Observable, debounce, map, of, switchMap } from 'rxjs'

@Component({
    selector: 'beta-asset-equipment-types',
    templateUrl: './equipment-types-page.component.html',
    styleUrls: ['./equipment-types-page.component.scss'],
})
export class EquipmentTypesPageComponent implements OnInit, ViewWillEnter {
    public readonly sideMenuID = 'side-menu'

    public equipmentTypes$!: Observable<IEquipmentTypes[]>
    public loading$!: Observable<boolean>

    public search: BehaviorSubject<string> = new BehaviorSubject('')

    constructor(private store: Store<IEquipmentTypesState>) {}

    ionViewWillEnter() {
        this.search.next('')
    }

    getRouterLink(id: ID) {
        return `/equipments/${id}`
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refresh(event: any) {
        this.loadEquipmentTypes(() => event.target.complete())
    }

    loadEquipmentTypes(onComplete?: () => void) {
        this.search.next('')

        this.store.dispatch(loadEquipmentTypes())
        onComplete && onComplete()
    }

    onSearchChange(event: unknown) {
        this.search.next((event as SearchbarCustomEvent).detail.value ?? '')
    }

    ngOnInit(): void {
        this.equipmentTypes$ = this.store.select(selectEquipmentTypes).pipe(
            switchMap((equipmentTypes) =>
                this.search.pipe(
                    debounce(() => of(1000)),
                    map((search) => search.toLowerCase()),
                    map((search) =>
                        equipmentTypes.filter((equipmentType) =>
                            equipmentType.name?.toLowerCase().includes(search),
                        ),
                    ),
                ),
            ),
        )

        this.loading$ = this.store.select(selectEquipmentTypesLoading)

        this.loadEquipmentTypes()
    }
}
