import { PrismaSnacksRepository } from '../../repositories/prisma/prisma-snacks-repository'
import { GetSnackUseCase } from '../get-snack'

export function makeGetSnackUseCase() {
  const prismaSnacksRepository = new PrismaSnacksRepository()
  const getSnackUseCase = new GetSnackUseCase(prismaSnacksRepository)

  return getSnackUseCase
}
