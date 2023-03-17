import { Component, OnInit } from '@angular/core'
import { EquipmentTypesService } from './equipment-types.service'
import { IEquipmentTypes } from '../models/model'
import { SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular'

@Component({
    selector: 'beta-asset-equipment-types',
    templateUrl: './equipment-types.component.html',
    styleUrls: ['./equipment-types.component.scss'],
})
export class EquipmentTypesPageComponent implements OnInit, ViewWillEnter {
    public equipmentTypes: IEquipmentTypes[] = []
    public loading = false

    public search = ''

    constructor(private equipmentTypesService: EquipmentTypesService) {}

    ionViewWillEnter() {
        this.search = ''
    }

    get filteredEquipmentTypes() {
        if (this.search.length < 2) return this.equipmentTypes

        const lowercase = this.search?.toLowerCase()
        return this.equipmentTypes.filter((equipmentType) =>
            equipmentType.name.toLowerCase().includes(lowercase),
        )
    }

    onSearchChange(event: unknown) {
        this.search = (event as SearchbarCustomEvent).detail.value ?? ''
    }

    ngOnInit(): void {
        this.loading = true
        this.equipmentTypesService.getEquipmentTypes().subscribe({
            next: (equipmentTypes) => {
                this.equipmentTypes = equipmentTypes
                this.loading = false
            },
            error: (error) => {
                console.log(error)
            },
        })
    }
}
