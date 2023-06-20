import { InMemorySnacksRepository } from '../repositories/in-memory/in-memory-snack-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetSnackUseCase } from './get-snack'

let snackRepository: InMemorySnacksRepository
let sut: GetSnackUseCase

describe('Fetch User Snacks History Use Case', () => {
  beforeEach(async () => {
    snackRepository = new InMemorySnacksRepository()
    sut = new GetSnackUseCase(snackRepository)
  })

  it('should be able to fetch snacks history', async () => {
    const snack = await snackRepository.create({
      name: 'Almoço',
      description: 'Arroz,Ovo',
      date_time: new Date(),
      on_diet: true,
      user_id: 'user-01',
    })

    const snacks = await sut.execute({
      snack_id: snack.id,
      user_id: 'user-01',
    })

    expect(snacks.id).toEqual(expect.any(String))
  })
})
