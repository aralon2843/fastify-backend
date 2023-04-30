import dotenv from 'dotenv';
dotenv.config();

import knex from 'knex';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const knexConnector = async (fastify: FastifyInstance, options: FastifyPluginOptions = {}) => {
  const connectionString = `postgres://${process.env.PG_USER}:${process.env['PG_PASSWORD']}@${process.env['PG_HOST']}:${process.env['PG_PORT']}/${process.env['PG_DATABASE']}`;
  const pg = knex({
    client: 'pg',
    connection: connectionString,
    ...options,
  });
  fastify.decorate('knex', pg);
};

export default fastifyPlugin(knexConnector);

