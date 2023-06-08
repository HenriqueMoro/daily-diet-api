import { PrismaSnacksRepository } from '../../repositories/prisma/prisma-snacks-repository'
import { CreateSnackUseCase } from '../create-snack'

export function makeCreateSnackUseCase() {
  const prismaSnacksRepository = new PrismaSnacksRepository()
  const createSnackUseCase = new CreateSnackUseCase(prismaSnacksRepository)

  return createSnackUseCase
}
