import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import environment from '../../environment/environment'
import { retry } from 'rxjs'
import { IEquipmentTypes } from '../models/model'
import { devDelay } from '../helpers/observable'

@Injectable()
export class EquipmentTypesService {
    constructor(private http: HttpClient) {}

    public getEquipmentTypes() {
        return this.http
            .get<IEquipmentTypes[]>(environment.apiUrl + '/equipment-types')
            .pipe(devDelay(), retry(3))
    }
}
