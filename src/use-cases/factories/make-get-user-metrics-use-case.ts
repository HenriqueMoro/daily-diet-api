import { PrismaSnacksRepository } from '../../repositories/prisma/prisma-snacks-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const prismaSnacksRepository = new PrismaSnacksRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaSnacksRepository,
  )

  return getUserMetricsUseCase
}
