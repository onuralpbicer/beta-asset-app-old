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
    maintenanceFields: IMaintenanceField[]
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

export interface IMaintenanceField {
    id: ID
    description: string
}

export interface IMaintenanceFieldValue {
    description: string
    status: 'GOOD' | 'FIXED' | 'REPLACED'
    notes?: string
}

export interface IMaintenanceDetails extends IMaintenanceSummary {
    fields: IMaintenanceFieldValue[]
}

export interface IMaintenanceCreateForm
    extends Omit<IMaintenanceSummary, 'id' | 'performed_by' | 'equipment_id'> {
    fields: (Omit<IMaintenanceFieldValue, 'description'> & { id: ID })[]
}
