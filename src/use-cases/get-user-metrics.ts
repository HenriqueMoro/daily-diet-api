// import { Snack } from '@prisma/client'
import { Snack } from '@prisma/client'
import { ISnacksRepository } from '../repositories/snacks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserMetricsUseCaseRequest {
  user_id: string
}

export class GetUserMetricsUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({ user_id }: GetUserMetricsUseCaseRequest): Promise<Snack> {
    const snack = await this.snackRepository.findById(snack_id)

    if (!snack) {
      throw new ResourceNotFoundError()
    }

    if (snack.user_id !== user_id) {
      throw new ResourceNotFoundError()
    }

    return snack
  }
}
