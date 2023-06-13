import { expect, describe, it, beforeEach } from 'vitest'
import { CreateSnackUseCase } from './create-snack'
import { InMemorySnacksRepository } from '../repositories/in-memory/in-memory-snack-repository'
import { randomUUID } from 'crypto'

let snackRepository: InMemorySnacksRepository
let snackUseCase: CreateSnackUseCase

describe('Create Snack Use Case', () => {
  beforeEach(() => {
    snackRepository = new InMemorySnacksRepository()
    snackUseCase = new CreateSnackUseCase(snackRepository)
  })

  it('should be able create snack', async () => {
    const { snack } = await snackUseCase.execute({
      name: 'Almoço',
      description: 'Descrever',
      date_time: new Date(),
      on_diet: true,
      user_id: randomUUID(),
    })

    expect(snack.id).toEqual(expect.any(String))
  })
})
