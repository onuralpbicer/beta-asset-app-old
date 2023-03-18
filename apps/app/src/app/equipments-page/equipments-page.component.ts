import { Component, OnInit } from '@angular/core'
import { EquipmentsService } from './equipments.service'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, take } from 'rxjs'
import { IEquipmentSummary } from '../models/model'
import { SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular'

@Component({
    selector: 'beta-asset-equipments-page',
    templateUrl: './equipments-page.component.html',
    styleUrls: ['./equipments-page.component.scss'],
})
export class EquipmentsPageComponent implements OnInit, ViewWillEnter {
    public equipments: IEquipmentSummary[] = []
    public loading = false

    public search = ''

    constructor(
        private activatedRoute: ActivatedRoute,
        private equipmentsService: EquipmentsService,
    ) {}

    ionViewWillEnter() {
        this.search = ''
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refresh(event: any) {
        this.loadEquipments(() => event.target.complete())
    }

    loadEquipments(onComplete?: () => void) {
        this.search = ''
        this.loading = true
        this.activatedRoute.params
            .pipe(
                take(1),
                map((params) => params['id']),
                switchMap((id) => this.equipmentsService.getEquipmentList(id)),
            )
            .subscribe({
                next: (equipments) => {
                    this.equipments = equipments
                    this.loading = false
                },
                error: (error) => {
                    console.log(error)
                },
            })
        onComplete && onComplete()
    }

    get filteredEquipments() {
        if (this.search.length < 2) return this.equipments

        const lowercase = this.search?.toLowerCase()
        return this.equipments.filter((equipment) =>
            equipment.name.toLowerCase().includes(lowercase),
        )
    }

    onSearchChange(event: unknown) {
        this.search = (event as SearchbarCustomEvent).detail.value ?? ''
    }

    ngOnInit(): void {
        this.loadEquipments()
    }
}
