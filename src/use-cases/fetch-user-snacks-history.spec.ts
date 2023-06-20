import { InMemorySnacksRepository } from '../repositories/in-memory/in-memory-snack-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserSnacksHistoryUseCase } from './fetch-user-snacks-history'

let snackRepository: InMemorySnacksRepository
let sut: FetchUserSnacksHistoryUseCase

describe('Fetch User Snacks History Use Case', () => {
  beforeEach(async () => {
    snackRepository = new InMemorySnacksRepository()
    sut = new FetchUserSnacksHistoryUseCase(snackRepository)
  })

  it('should be able to fetch snacks history', async () => {
    await snackRepository.create({
      name: 'Almoço',
      description: 'Arroz,Ovo',
      date_time: new Date(),
      on_diet: true,
      user_id: 'user-01',
    })

    await snackRepository.create({
      name: 'Janta',
      description: 'Feijao,Carne',
      date_time: new Date(),
      on_diet: true,
      user_id: 'user-01',
    })

    const { snacks } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(snacks).toHaveLength(2)
    expect(snacks).toEqual([
      expect.objectContaining({ name: 'Almoço' }),
      expect.objectContaining({ name: 'Janta' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await snackRepository.create({
        name: `name-${i}`,
        description: 'Feijao,Carne',
        date_time: new Date(),
        on_diet: true,
        user_id: 'user-01',
      })
    }

    const { snacks } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(snacks).toHaveLength(2)
    expect(snacks).toEqual([
      expect.objectContaining({ name: 'name-21' }),
      expect.objectContaining({ name: 'name-22' }),
    ])
  })
})
