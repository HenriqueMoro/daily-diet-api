import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'

import { ISnacksRepository } from '../snacks-repository'

export class PrismaSnacksRepository implements ISnacksRepository {
  async delete(id: string) {
    const snack = await prisma.snack.delete({
      where: {
        id,
      },
    })

    return snack
  }

  async update(data: Prisma.SnackUpdateInput & { id: string }) {
    const { id } = data

    const snack = await prisma.snack.update({
      where: {
        id,
      },

      data,
    })

    return snack
  }

  async create(data: Prisma.SnackUncheckedCreateInput) {
    const snack = await prisma.snack.create({
      data,
    })

    return snack
  }

  async findById(id: string) {
    const snack = await prisma.snack.findUnique({
      where: {
        id,
      },
    })

    return snack
  }

  async findManyByUserId(userId: string) {
    const snacks = await prisma.snack.findMany({
      where: {
        user_id: userId,
      },
    })

    return snacks
  }

  async countByUserId(userId: string) {
    const count = await prisma.snack.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async countByUserIdAndOnDiet(userId: string, on_diet: boolean) {
    const count = await prisma.snack.count({
      where: {
        user_id: userId,
        on_diet,
      },
    })

    return count
  }

  async findManyBestSequenceByUserId(userId: string) {}
}
