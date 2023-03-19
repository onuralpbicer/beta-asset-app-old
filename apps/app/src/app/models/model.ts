export type ID = string

export interface IEquipmentTypes {
    id: ID
    name: string
}

export interface IEquipmentSummary {
    id: ID
    name: string
}

export interface IEquipmentDetails extends IEquipmentSummary {
    brand: string
    location: string
    serial_number: string
    type: IEquipmentTypes['name']
    fields: IEquipmentTypeField[]
}

export interface IEquipmentTypeField {
    id: ID
    name: string
    unit: string
    value: string
}

export interface IMaintenanceSummary {
    id: ID
    datetime: Date
    type: 'PERIODICAL' | 'FAULT'
    performed_by: string
    notes?: string
    equipment_id: ID
}

export interface IMaintenanceFieldValue {
    description: string
    status: 'GOOD' | 'FIXED' | 'REPLACED'
    notes?: string
}

export interface IMaintenanceDetails extends IMaintenanceSummary {
    fields: IMaintenanceFieldValue[]
}
