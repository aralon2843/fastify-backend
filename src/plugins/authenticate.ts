import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UNAUTHORIZED_ERROR } from '../errors/errors';

const authenticate = async (fastify: FastifyInstance) => {
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: UNAUTHORIZED_ERROR });
    }
  });
};

export default fastifyPlugin(authenticate);
