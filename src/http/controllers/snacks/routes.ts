import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { deleteSnack } from './delete'

export async function snacksRoutes(app: FastifyInstance) {
  app.post('/snacks', create)
  app.patch('/snacks/:snackId', update)
  app.delete('/snacks/:snackId', deleteSnack)
}
