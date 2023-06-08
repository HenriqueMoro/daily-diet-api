import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'

export async function snacksRoutes(app: FastifyInstance) {
  app.post('/snacks', create)
  app.patch('/snacks/:snackId', update)
}
