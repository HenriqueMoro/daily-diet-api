import { Snack } from '@prisma/client'
import { ISnacksRepository } from '../repositories/snacks-repository'

interface FetchUserSnacksHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserSnacksHistoryUseCaseResponse {
  snacks: Snack[]
}

export class FetchUserSnacksHistoryUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserSnacksHistoryUseCaseRequest): Promise<FetchUserSnacksHistoryUseCaseResponse> {
    const snacks = await this.snackRepository.findManyByUserId(userId, page)

    return {
      snacks,
    }
  }
}
