import { PrismaSnacksRepository } from '../../repositories/prisma/prisma-snacks-repository'
import { UpdateSnackUseCase } from '../update-snack'

export function makeUpdateSnackUseCase() {
  const prismaSnacksRepository = new PrismaSnacksRepository()
  const updateSnackUseCase = new UpdateSnackUseCase(prismaSnacksRepository)

  return updateSnackUseCase
}
