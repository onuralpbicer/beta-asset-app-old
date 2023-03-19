import { prisma } from '../../shared/database'
import { IStateMiddleware } from '../../shared/types'

const getMaintenanceSummaryForEquipment: IStateMiddleware = async (ctx) => {
    const equipment_id = ctx.params.id
    const { org_id } = ctx.state

    const result = await prisma.maintenances.findMany({
        select: {
            id: true,
            datetime: true,
            Users: {
                select: {
                    name: true,
                },
            },
            type: true,
        },
        where: {
            Equipments: {
                id: equipment_id,
                Equipment_Types: {
                    org_id,
                },
            },
        },
    })

    ctx.body = result.map(({ Users, ...rest }) => ({
        ...rest,
        equipment_id,
        performed_by: Users.name,
    }))
}

export default getMaintenanceSummaryForEquipment
