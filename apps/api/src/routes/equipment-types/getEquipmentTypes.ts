import { prisma } from '../../shared/database'
import { IStateMiddleware } from '../../shared/types'

const getEquipmentTypes: IStateMiddleware = async (ctx) => {
    const { org_id } = ctx.state

    ctx.body = await prisma.equipment_Types.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            org_id,
        },
    })
}

export default getEquipmentTypes
