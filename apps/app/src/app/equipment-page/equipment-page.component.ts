import { Component, OnInit } from '@angular/core'
import { EquipmentService } from './equipment.service'
import { ActivatedRoute } from '@angular/router'
import { take, map, switchMap } from 'rxjs'
import { IEquipmentDetails } from '../models/model'

@Component({
    selector: 'beta-asset-equipment-page',
    templateUrl: './equipment-page.component.html',
    styleUrls: ['./equipment-page.component.scss'],
})
export class EquipmentPageComponent implements OnInit {
    public equipment: IEquipmentDetails | undefined = undefined
    public loading = false

    constructor(
        private activatedRoute: ActivatedRoute,
        private equipmentService: EquipmentService,
    ) {}

    ngOnInit(): void {
        this.loadEquipmentDetails()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refresh(event: any) {
        this.loadEquipmentDetails(() => event.target.complete())
    }

    loadEquipmentDetails(onComplete?: () => void) {
        this.loading = true

        this.activatedRoute.params
            .pipe(
                take(1),
                map((params) => params['id']),
                switchMap((id) =>
                    this.equipmentService.getEquipmentDetails(id),
                ),
            )
            .subscribe({
                next: (equipment) => {
                    this.equipment = equipment
                    this.loading = false
                    console.log(equipment)
                },
                error: (error) => {
                    console.log(error)
                },
            })
        onComplete && onComplete()
    }
}
