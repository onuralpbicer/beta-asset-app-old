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
