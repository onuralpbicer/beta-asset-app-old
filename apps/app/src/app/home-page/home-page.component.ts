import { Component, OnInit } from '@angular/core'
import { EquipmentTypesService } from './equipment-types.service'
import { IEquipmentTypes } from '../models/model'
import { SearchbarCustomEvent, ViewWillEnter } from '@ionic/angular'

@Component({
    selector: 'beta-asset-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, ViewWillEnter {
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

    onSearchChange(event: any) {
        this.search = event.detail.value
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
