import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { history } from './history'
import { metrics } from './metrics'
import { get } from './get'
import { deleteSnack } from './delete'

export async function snacksRoutes(app: FastifyInstance) {
  app.post('/snacks', create)
  app.get('/snacks', history)
  app.get('/snacks/:snackId', get)
  app.patch('/snacks/:snackId', update)
  app.delete('/snacks/:snackId', deleteSnack)
  app.get('/snacks/metrics', metrics)
}
