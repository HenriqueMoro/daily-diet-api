import { Prisma, Snack } from '@prisma/client'

export interface ISnacksRepository {
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>
  update(data: Prisma.SnackUpdateInput & { id: string }): Promise<Snack>
  delete(id: string): Promise<Snack | null>
  findById(id: string): Promise<Snack | null>
  findManyByUserId(userId: string): Promise<Snack[]>
  countByUserId(userId: string): Promise<number>
  countByUserIdAndOnDiet(userId: string, on_diet: boolean): Promise<number>
}
