import { Snack } from '@prisma/client'
import { ISnacksRepository } from '../repositories/snacks-repository'

interface CreateSnackUseCaseRequest {
  name: string
  description: string | null
  date_time: Date
  on_diet: boolean
  user_id: string
}

interface CreateSnackUseCaseResponse {
  snack: Snack
}

export class CreateSnackUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({
    name,
    description,
    date_time,
    on_diet,
    user_id,
  }: CreateSnackUseCaseRequest): Promise<CreateSnackUseCaseResponse> {
    const snack = await this.snackRepository.create({
      name,
      description,
      date_time,
      on_diet,
      user_id,
    })

    return {
      snack,
    }
  }
}
