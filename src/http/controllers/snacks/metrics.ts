import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '../../../use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const snack = await getUserMetricsUseCase.execute({
    user_id: request.user.sub,
  })

  return reply.status(200).send({
    snack,
  })
}
