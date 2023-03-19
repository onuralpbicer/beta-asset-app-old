import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import environment from '../../environment/environment'
import {
    ID,
    IEquipmentDetails,
    IEquipmentSummary,
    IMaintenanceSummary,
} from '../models/model'

@Injectable({
    providedIn: 'root',
})
export class EquipmentsService {
    constructor(private http: HttpClient) {}

    public getEquipmentList(equipment_type_id: ID) {
        return this.http.get<IEquipmentSummary[]>(
            environment.apiUrl +
                `/equipment-types/${equipment_type_id}/equipments`,
        )
    }

    public getEquipmentDetails(equipment_id: ID) {
        return this.http.get<IEquipmentDetails>(
            environment.apiUrl + `/equipments/${equipment_id}`,
        )
    }

    public getMaintenanceList(equipment_id: ID) {
        return this.http.get<IMaintenanceSummary[]>(
            environment.apiUrl + `/equipments/${equipment_id}/maintenances`,
        )
    }
}
