import { prisma } from '../../shared/database'
import { IStateMiddleware } from '../../shared/types'

const getMaintenanceDetails: IStateMiddleware = async (ctx) => {
    const maintenance_id = ctx.params.id
    const { org_id } = ctx.state

    const { Users, Maintenance_Fields, Equipments, ...rest } =
        await prisma.maintenances.findFirstOrThrow({
            select: {
                id: true,
                datetime: true,
                Users: {
                    select: {
                        name: true,
                    },
                },
                type: true,
                notes: true,
                Maintenance_Fields: {
                    select: {
                        field_id: true,
                        maintenance_id: true,
                        status: true,
                        notes: true,
                    },
                },
                Equipments: {
                    select: {
                        id: true,
                        Equipment_Types: {
                            select: {
                                Equipment_Type_Maintenance_Fields: {
                                    select: {
                                        id: true,
                                        description: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                id: maintenance_id,
                Equipments: {
                    Equipment_Types: {
                        org_id,
                    },
                },
            },
        })

    const maintenanceFieldValues = new Map(
        Maintenance_Fields.map(({ field_id, ...rest }) => [field_id, rest]),
    )

    ctx.body = {
        ...rest,
        performed_by: Users.name,
        equipment_id: Equipments.id,
        fields: Equipments.Equipment_Types.Equipment_Type_Maintenance_Fields.map(
            ({ id, ...rest }) => {
                const value = maintenanceFieldValues.get(id)

                return {
                    ...rest,
                    status: value?.status,
                    notes: value?.notes,
                }
            },
        ),
    }
}

export default getMaintenanceDetails
