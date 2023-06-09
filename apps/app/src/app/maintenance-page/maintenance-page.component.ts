import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
    IEquipmentEntity,
    IEquipmentsState,
    selectEquipment,
} from '../equipments/equipments.reducer'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, combineLatest, map, of, switchMap, take, tap } from 'rxjs'
import { NavController } from '@ionic/angular'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ID } from '../models/model'
import { HttpClient } from '@angular/common/http'
import environment from '../../environment/environment'

@Component({
    selector: 'beta-asset-maintenance-page',
    templateUrl: './maintenance-page.component.html',
    styleUrls: ['./maintenance-page.component.scss'],
})
export class MaintenancePageComponent implements OnInit {
    public equipment_id: ID | undefined = undefined
    public form!: FormGroup

    public formFieldDescriptions: Map<ID, string> = new Map()

    public readonly dateTimeModalID = 'date-time-modal'

    constructor(
        private activatedRoute: ActivatedRoute,
        private equipmentStore: Store<IEquipmentsState>,
        private navController: NavController,
        private router: Router,
        private fb: FormBuilder,
        private http: HttpClient,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map((params) => params['id'] as string),
                take(1),
                switchMap((equipment_id) =>
                    combineLatest([
                        of(equipment_id),
                        this.equipmentStore
                            .select(selectEquipment(equipment_id))
                            .pipe(take(1)),
                    ]),
                ),
            )
            .subscribe(([equipment_id, equipment]) => {
                this.equipment_id = equipment_id

                if (!equipment) {
                    this.goBack()
                    return
                }

                this.formFieldDescriptions = new Map(
                    equipment.maintenanceFields?.map((field) => [
                        field.id,
                        field.description,
                    ]),
                )
                this.setupForm(equipment)
            })
    }

    goBack() {
        this.navController.navigateBack(['equipment', this.equipment_id])
    }

    setupForm(equipment: IEquipmentEntity) {
        this.form = this.fb.group({
            datetime: [new Date().toISOString(), Validators.required],
            type: ['PERIODICAL', Validators.required],
            notes: [''],
            fields: this.fb.array(
                equipment.maintenanceFields?.map((field) => {
                    return this.fb.group({
                        id: [field.id],
                        status: [null, Validators.required],
                        notes: [''],
                    })
                }) ?? [],
            ),
        })

        this.form.valueChanges.subscribe(console.log)
    }

    modalTrigger(id: string) {
        return `notes-modal-${id}`
    }

    get fields() {
        return this.form.controls['fields'] as FormArray
    }

    submit() {
        this.http
            .post(
                environment.apiUrl +
                    `/equipments/${this.equipment_id}/maintenances`,
                this.form.value,
            )
            .pipe(
                tap(() => {
                    this.goBack()
                }),
                catchError((err) => {
                    alert(err.message)
                    return of(err)
                }),
            )
            .subscribe()
    }
}
