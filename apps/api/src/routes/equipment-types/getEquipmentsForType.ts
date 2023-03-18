import { prisma } from '../../shared/database'
import { IStateMiddleware } from '../../shared/types'

const getEquipmentsForType: IStateMiddleware = async (ctx) => {
    const equipment_type_id = ctx.params.id

    ctx.body = await prisma.equipments.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            equipment_type_id,
        },
    })
}

export default getEquipmentsForType
