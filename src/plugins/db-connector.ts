import * as dotenv from 'dotenv';
dotenv.config();

import fastifyPlugin from 'fastify-plugin';
import { DataSource } from 'typeorm';

import { User } from './../modules/user/user.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['PG_HOST'],
  username: process.env['PG_USER'],
  database: process.env['PG_DATABASE'],
  password: process.env['PG_PASSWORD'],
  port: Number(process.env['PG_PORT']),
  entities: [User],
  synchronize: true,
  logging: true,
});

const dbConnector = async () => {
  await AppDataSource.initialize();
};

export default fastifyPlugin(dbConnector);
