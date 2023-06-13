import { PrismaSnacksRepository } from '../../repositories/prisma/prisma-snacks-repository'
import { DeleteSnackUseCase } from '../delete-snack'

export function makeDeleteSnackUseCase() {
  const prismaSnacksRepository = new PrismaSnacksRepository()
  const deleteSnackUseCase = new DeleteSnackUseCase(prismaSnacksRepository)

  return deleteSnackUseCase
}
