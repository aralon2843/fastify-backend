import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import userRoutes from './src/modules/user/user.route';
import dbConnector from './src/plugins/db-connector';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import jwt from './src/plugins/jwt';

const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(dbConnector);
fastify.register(fastifyCors);
fastify.register(jwt);
fastify.register(userRoutes, { prefix: '/api/user' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
