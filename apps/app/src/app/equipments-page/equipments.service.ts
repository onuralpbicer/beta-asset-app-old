import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { retry } from 'rxjs'
import environment from '../../environment/environment'
import { ID, IEquipmentSummary } from '../models/model'
import { devDelay } from '../helpers/observable'

@Injectable({
    providedIn: 'root',
})
export class EquipmentsService {
    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
    ) {}

    public getEquipmentList(equipment_type_id: ID) {
        return this.http
            .get<IEquipmentSummary[]>(
                environment.apiUrl +
                    `/equipment-types/${equipment_type_id}/equipments`,
            )
            .pipe(devDelay(), retry(3))
    }
}
