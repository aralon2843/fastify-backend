import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';

const secret = process.env.SECRET_KEY;

const jwt = async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: secret as string,
  });
};

export default fastifyPlugin(jwt);
