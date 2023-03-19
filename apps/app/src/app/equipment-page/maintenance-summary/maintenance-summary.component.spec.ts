import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MaintenanceSummaryComponent } from './maintenance-summary.component'

describe('MaintenanceSummaryComponent', () => {
    let component: MaintenanceSummaryComponent
    let fixture: ComponentFixture<MaintenanceSummaryComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MaintenanceSummaryComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(MaintenanceSummaryComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
