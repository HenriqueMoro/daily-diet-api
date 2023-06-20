import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetSnackUseCase } from '../../../use-cases/factories/make-get-snack-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const validateSnackIdParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = validateSnackIdParamsSchema.parse(request.params)

  try {
    const getSnackUseCase = makeGetSnackUseCase()

    const snack = await getSnackUseCase.execute({
      snack_id: snackId,
      user_id: request.user.sub,
    })

    return reply.status(200).send({
      snack,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
