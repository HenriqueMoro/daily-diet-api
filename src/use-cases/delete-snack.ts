// import { Snack } from '@prisma/client'
import { ISnacksRepository } from '../repositories/snacks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteSnackUseCaseRequest {
  snack_id: string
  user_id: string
}

interface DeleteSnackUseCaseResponse {
  data: string
}

export class DeleteSnackUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({
    snack_id,
    user_id,
  }: DeleteSnackUseCaseRequest): Promise<DeleteSnackUseCaseResponse> {
    const snack = await this.snackRepository.findById(snack_id)

    if (!snack) {
      throw new ResourceNotFoundError()
    }

    if (snack.user_id !== user_id) {
      throw new ResourceNotFoundError()
    }

    await this.snackRepository.delete(snack_id)

    return {
      data: 'Deleted',
    }
  }
}
