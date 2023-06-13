import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeDeleteSnackUseCase } from '../../../use-cases/factories/make-delete-snack-use-case'

export async function deleteSnack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const validateSnackIdParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = validateSnackIdParamsSchema.parse(request.params)

  try {
    const deleteSnackUseCase = makeDeleteSnackUseCase()

    await deleteSnackUseCase.execute({
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
