import { LoginType } from './user.schema';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { registerHandler, loginHandler, getAllHandler } from './user.controller';

async function userRoutes(fastify: FastifyInstance, options: Object, done: Function) {
  fastify.post('/register', registerHandler);

  fastify.post('/login', (request: FastifyRequest<{ Body: LoginType }>, reply: FastifyReply) =>
    loginHandler(fastify, request, reply)
  );

  fastify.get('/all', getAllHandler);

  done();
}

export default userRoutes;
