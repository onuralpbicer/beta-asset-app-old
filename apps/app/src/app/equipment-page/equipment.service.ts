import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { retry } from 'rxjs'
import environment from '../../environment/environment'
import { ID, IEquipmentDetails } from '../models/model'
import { devDelay } from '../helpers/observable'

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    constructor(private http: HttpClient) {}

    public getEquipmentDetails(equipment_id: ID) {
        return this.http
            .get<IEquipmentDetails>(
                environment.apiUrl + `/equipments/${equipment_id}`,
            )
            .pipe(devDelay(), retry(3))
    }
}
