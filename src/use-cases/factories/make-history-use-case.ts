import { PrismaSnacksRepository } from '../../repositories/prisma/prisma-snacks-repository'
import { FetchUserSnacksHistoryUseCase } from '../fetch-user-snacks-history'

export function makeFetchUserSnacksHistoryUseCase() {
  const prismaSnacksRepository = new PrismaSnacksRepository()
  const fetchUserSnacksHistoryUseCase = new FetchUserSnacksHistoryUseCase(
    prismaSnacksRepository,
  )

  return fetchUserSnacksHistoryUseCase
}
