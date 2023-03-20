import { prisma } from '../../shared/database'
import { IStateMiddleware } from '../../shared/types'

const getMaintenanceFields: IStateMiddleware = async (ctx) => {
    const equipment_id = ctx.params.id
    const { org_id } = ctx.state

    const result = await prisma.equipments.findFirstOrThrow({
        select: {
            Equipment_Types: {
                select: {
                    Equipment_Type_Maintenance_Fields: {
                        select: {
                            id: true,
                            equipment_type_id: true,
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

    ctx.body = result.Equipment_Types.Equipment_Type_Maintenance_Fields
}

export default getMaintenanceFields
