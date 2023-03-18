import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import environment from '../../environment/environment'
import { IEquipmentTypes } from '../models/model'

@Injectable()
export class EquipmentTypesService {
    constructor(private http: HttpClient) {}

    public getEquipmentTypes() {
        return this.http.get<IEquipmentTypes[]>(
            environment.apiUrl + '/equipment-types',
        )
    }
}
