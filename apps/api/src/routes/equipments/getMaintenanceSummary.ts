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
        performed_by: Users.name,
    }))
}

export default getMaintenanceSummaryForEquipment

// Query to be used later for maintenance details
//  await prisma.maintenances.findMany({
//      select: {
//          id: true,
//          datetime: true,
//          Users: {
//              select: {
//                  name: true,
//              },
//          },
//          type: true,
//          notes: true,
//          // Maintenance_Fields: {
//          //     select: {
//          //         status: true,
//          //         notes: true,
//          //     },
//          // },
//          Maintenance_Fields: {
//              select: {
//                  field_id: true,
//                  maintenance_id: true,
//                  status: true,
//                  notes: true,
//              },
//          },
//          Equipments: {
//              select: {
//                  Equipment_Types: {
//                      select: {
//                          Equipment_Type_Maintenance_Fields: {
//                              select: {
//                                  id: true,
//                                  description: true,
//                              },
//                          },
//                      },
//                  },
//              },
//          },
//      },
//      where: {
//          Equipments: {
//              id: equipment_id,
//              Equipment_Types: {
//                  org_id,
//              },
//          },
//      },
//  })
