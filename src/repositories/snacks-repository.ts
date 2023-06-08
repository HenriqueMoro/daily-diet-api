import { Prisma, Snack } from '@prisma/client'

export interface ISnacksRepository {
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>
  update(data: Prisma.SnackUpdateInput & { id: string }): Promise<Snack>
  findById(id: string): Promise<Snack | null>
}
