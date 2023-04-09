import {
    Equipment_Type_Maintenance_Fields,
    Maintenance_Fields,
    Maintenances,
} from '@prisma/client'
import { IStateMiddleware } from '../../shared/types'
import Joi from 'joi'
import { validateBody } from '../../shared/validation'
import { prisma } from '../../shared/database'

interface CreateMaintenancePayload
    extends Pick<Maintenances, 'datetime' | 'type' | 'notes'> {
    fields: Array<
        Pick<Maintenance_Fields, 'notes' | 'status'> &
            Pick<Equipment_Type_Maintenance_Fields, 'id'>
    >
}

const validator = Joi.object<CreateMaintenancePayload>({
    datetime: Joi.date().less(Date.now()).required(),
    notes: Joi.string().allow(''),
    type: Joi.string().valid('PERIODICAL', 'FAULT').required(),
    fields: Joi.array()
        .items(
            Joi.object({
                id: Joi.string().required(),
                notes: Joi.string().allow(''),
                status: Joi.string()
                    .valid('GOOD', 'FIXED', 'REPLACED')
                    .required(),
            }),
        )
        .required(),
})

const postMaintenance: IStateMiddleware = async (ctx) => {
    const body = await validateBody(ctx.request.body, validator)
    const equipment_id = ctx.params.id
    const { org_id, user_id } = ctx.state

    try {
        // check if the user belongs to an org that has access to edit this equipment
        await prisma.organisations.findFirstOrThrow({
            where: {
                id: org_id,
                Equipment_Types: {
                    some: {
                        id: equipment_id,
                    },
                },
                Users: {
                    some: {
                        id: user_id,
                    },
                },
            },
        })

        await prisma.maintenances.create({
            data: {
                datetime: body.datetime,
                type: body.type,
                notes: body.notes,
                Users: {
                    connect: {
                        id: user_id,
                    },
                },
                Equipments: {
                    connect: {
                        id: equipment_id,
                    },
                },
                Maintenance_Fields: {
                    createMany: {
                        data: body.fields.map((field) => ({
                            status: field.status,
                            notes: field.notes,
                            field_id: field.id,
                        })),
                    },
                },
            },
        })

        ctx.status = 201
    } catch (err) {
        console.log(err)
        throw err
    }
}

export default postMaintenance
