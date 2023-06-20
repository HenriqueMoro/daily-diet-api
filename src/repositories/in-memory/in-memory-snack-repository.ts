import { Prisma, Snack } from '@prisma/client'
import { ISnacksRepository } from '../snacks-repository'
import { randomUUID } from 'crypto'

export class InMemorySnacksRepository implements ISnacksRepository {
  public snacks: Snack[] = []

  async delete(id: string) {
    const snackIndex = this.snacks.findIndex((snack) => snack.id === id)
    if (snackIndex !== -1) {
      const snack = this.snacks.splice(snackIndex, 1)[0]
      return snack
    }
    return null
  }

  async update(data: Prisma.SnackUpdateInput & { id: string }) {
    const snack = {
      id: randomUUID(),
      name: 'Reifeção',
      description: 'String',
      date_time: new Date(),
      on_diet: true,
      created_at: new Date(),
      user_id: randomUUID(),
    }

    return snack
  }

  async create(data: Prisma.SnackUncheckedCreateInput) {
    const snack = {
      id: randomUUID(),
      name: data.name,
      description: data.description || null,
      on_diet: data.on_diet,
      date_time: new Date(data.date_time),
      user_id: data.user_id,
      created_at: new Date(),
    }
    this.snacks.push(snack)
    return snack
  }

  async findById(id: string) {
    const snack = this.snacks.find((snack) => snack.id === id)
    return snack || null
  }

  async findManyByUserId(userId: string, page: number) {
    return this.snacks
      .filter((snack) => snack.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }
}
