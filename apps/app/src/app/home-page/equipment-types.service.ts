import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import environment from '../../environment/environment'
import { delay, retry } from 'rxjs'
import { IEquipmentTypes } from '../models/model'

@Injectable()
export class EquipmentTypesService {
    constructor(private http: HttpClient) {}

    public getEquipmentTypes() {
        return this.http
            .get<IEquipmentTypes[]>(environment.apiUrl + '/equipment-types')
            .pipe(delay(2000), retry(3))
    }
}
