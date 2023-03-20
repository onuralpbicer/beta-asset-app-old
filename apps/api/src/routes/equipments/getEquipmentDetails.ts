import { prisma } from '../../shared/database'
import { IStateMiddleware } from '../../shared/types'

const getEquipmentDetails: IStateMiddleware = async (ctx) => {
    const equipment_id = ctx.params.id
    const { org_id } = ctx.state

    const { Equipment_Types, ...rest } =
        await prisma.equipments.findFirstOrThrow({
            select: {
                id: true,
                name: true,
                location: true,
                brand: true,
                serial_number: true,
                Equipment_Types: {
                    select: {
                        name: true,
                        Equipment_Type_Fields: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                                min: true,
                                max: true,
                                unit: true,
                                options: true,
                                Equipment_Fields: {
                                    select: {
                                        value: true,
                                    },
                                },
                            },
                        },
                        Equipment_Type_Maintenance_Fields: {
                            select: {
                                id: true,
                                description: true,
                            },
                        },
                    },
                },
            },
            where: {
                id: equipment_id,
                Equipment_Types: {
                    org_id,
                },
            },
        })

    ctx.body = {
        ...rest,
        type: Equipment_Types.name,
        fields: Equipment_Types.Equipment_Type_Fields.map(
            ({ Equipment_Fields, ...rest }) => ({
                ...rest,
                value: Equipment_Fields[0]?.value,
            }),
        ),
        maintenanceFields: Equipment_Types.Equipment_Type_Maintenance_Fields,
    }
}

export default getEquipmentDetails
