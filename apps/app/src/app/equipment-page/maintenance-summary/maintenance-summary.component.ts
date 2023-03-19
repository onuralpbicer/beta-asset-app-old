import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
    IMaintenanceState,
    selectMaintenanceList,
    selectMaintenanceListLoading,
} from '../../maintenances/maintenances.reducer'
import { Observable } from 'rxjs'
import { PartialOmit } from '../../helpers/types'
import { ID, IMaintenanceSummary } from '../../models/model'

@Component({
    selector: 'beta-asset-maintenance-summary',
    templateUrl: './maintenance-summary.component.html',
    styleUrls: ['./maintenance-summary.component.scss'],
})
export class MaintenanceSummaryComponent implements OnInit {
    public maintenances$!: Observable<PartialOmit<IMaintenanceSummary, 'id'>[]>
    public loading$!: Observable<boolean>

    @Input() equipment_id!: ID

    constructor(private store: Store<IMaintenanceState>) {}

    ngOnInit(): void {
        this.maintenances$ = this.store.select(
            selectMaintenanceList(this.equipment_id),
        )
        this.loading$ = this.store.select(selectMaintenanceListLoading)
    }
}
