// import { Snack } from '@prisma/client'
import { Snack } from '@prisma/client'
import { ISnacksRepository } from '../repositories/snacks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSnackUseCaseRequest {
  snack_id: string
  user_id: string
}

export class GetSnackUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({ snack_id, user_id }: GetSnackUseCaseRequest): Promise<Snack> {
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
