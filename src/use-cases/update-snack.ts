// import { Snack } from '@prisma/client'
import { ISnacksRepository } from '../repositories/snacks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateSnackUseCaseRequest {
  name: string | undefined
  description: string | undefined
  date_time: Date | undefined
  on_diet: boolean | undefined
  snack_id: string
  user_id: string
}

interface UpdateSnackUseCaseResponse {
  // snack: Snack
  data: string
}

export class UpdateSnackUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({
    name,
    description,
    date_time,
    on_diet,
    snack_id,
    user_id,
  }: UpdateSnackUseCaseRequest): Promise<UpdateSnackUseCaseResponse> {
    const snack = await this.snackRepository.findById(snack_id)

    if (!snack) {
      throw new ResourceNotFoundError()
    }

    if (snack.user_id !== user_id) {
      throw new ResourceNotFoundError()
    }

    await this.snackRepository.update({
      id: snack_id,
      name,
      description,
      date_time,
      on_diet,
    })

    return {
      data: 'Ola',
    }
  }
}
