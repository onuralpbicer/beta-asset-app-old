import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import environment from '../../environment/environment'
import { ID, IMaintenanceDetails } from '../models/model'

@Injectable({
    providedIn: 'root',
})
export class MaintenanecesService {
    constructor(private http: HttpClient) {}

    public getMaintenanceDetails(maintenance_id: ID) {
        return this.http.get<IMaintenanceDetails>(
            environment.apiUrl + `/maintenances/${maintenance_id}`,
        )
    }
}
