import { FastifyInstance } from 'fastify/types/instance';
import { hashPassword } from '../../utils/hash';
import { SignInType } from '../auth/auth.schema';
import { UserType } from './user.schema';
import { SOMETHING_WENT_WRONG } from '../../errors/errors';

export const userService = (fastify: FastifyInstance) => ({
  async getAll() {
    return fastify.knex('user').select(['id', 'name', 'login']);
  },

  async findUserByLogin(login: string): Promise<undefined | Omit<UserType, 'id'>> {
    const user = fastify.knex<Omit<UserType, 'id'>>('user').where({ login }).first();
    if (Array.isArray(user) && user.length === 0) {
      return undefined;
    }
    return user;
  },

  async createUser({ name, login, password }: SignInType): Promise<number | Error> {
    const { hash, salt } = hashPassword(password);
    try {
      return await fastify.knex.transaction(async (trx) => {
        const [user] = await trx<UserType>('user').insert({ name, login, password_hash: hash }, 'id');
        await trx('password_salt').insert({ user_id: user.id, salt });
        return user.id;
      });
    } catch (err) {
      console.error(err);
      return new Error(SOMETHING_WENT_WRONG);
    }
  },
});
