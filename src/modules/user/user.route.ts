import { userService } from './user.service';
import { FastifyInstance } from 'fastify/types/instance';

async function userRoutes(fastify: FastifyInstance, options: Object, done: Function) {
  const _userService = userService(fastify);
  fastify.get(
    '/all',
    {
      onRequest: [fastify.authenticate],
    },
    async () => {
      return await _userService.getAll();
    },
  );

  done();
}

export default userRoutes;
