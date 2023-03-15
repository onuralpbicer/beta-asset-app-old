import { PrismaClient } from '@prisma/client'

export let prisma: PrismaClient

export function setupDatabase() {
    prisma = new PrismaClient()
}
