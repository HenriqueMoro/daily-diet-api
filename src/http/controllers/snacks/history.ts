import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserSnacksHistoryUseCase } from '../../../use-cases/factories/make-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const snackHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = snackHistoryQuerySchema.parse(request.query)

  const fetchUserSnacksHistoryUseCase = makeFetchUserSnacksHistoryUseCase()

  const { snacks } = await fetchUserSnacksHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    snacks,
  })
}
