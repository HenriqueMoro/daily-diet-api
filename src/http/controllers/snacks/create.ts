import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateSnackUseCase } from '../../../use-cases/factories/make-create-snack-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const snackBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    date_time: z.any(),
    on_diet: z.boolean(),
  })

  const { name, description, date_time, on_diet } = snackBodySchema.parse(
    request.body,
  )

  const createSnackUseCase = makeCreateSnackUseCase()

  await createSnackUseCase.execute({
    name,
    description,
    date_time,
    on_diet,
    user_id: request.user.sub,
  })

  return reply.status(201).send()
}
