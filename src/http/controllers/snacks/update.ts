import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateSnackUseCase } from '../../../use-cases/factories/make-update-snack-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const snackBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date_time: z.any().optional(),
    on_diet: z.boolean().optional(),
  })

  const validateSnackIdParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = validateSnackIdParamsSchema.parse(request.params)

  const { name, description, date_time, on_diet } = snackBodySchema.parse(
    request.body,
  )

  try {
    const updateSnackUseCase = makeUpdateSnackUseCase()

    await updateSnackUseCase.execute({
      name,
      description,
      date_time,
      on_diet,
      snack_id: snackId,
      user_id: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
