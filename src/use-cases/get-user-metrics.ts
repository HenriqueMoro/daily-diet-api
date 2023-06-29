import { ISnacksRepository } from '../repositories/snacks-repository'

interface GetUserMetricsUseCaseRequest {
  user_id: string
}
interface GetUserMetricsUseCaseResponse {
  countSnacks: number
  countSnacksOnDiet: number
  countSnacksNotOnDiet: number
  bestSequence: number
}

export class GetUserMetricsUseCase {
  constructor(private snackRepository: ISnacksRepository) {}

  async execute({
    user_id,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const countSnacks = await this.snackRepository.countByUserId(user_id)
    const countSnacksOnDiet = await this.snackRepository.countByUserIdAndOnDiet(
      user_id,
      true,
    )
    const countSnacksNotOnDiet =
      await this.snackRepository.countByUserIdAndOnDiet(user_id, false)

    const allSnacks = await this.snackRepository.findManyByUserId(user_id)
    let aux = 0
    let bestSequence = 0

    allSnacks.forEach((snack) => {
      if (snack.on_diet) {
        aux = aux + 1

        if (aux > bestSequence) {
          bestSequence = aux
        }
      } else {
        aux = 0
      }
    })

    return {
      countSnacks,
      countSnacksOnDiet,
      countSnacksNotOnDiet,
      bestSequence,
    }
  }
}
