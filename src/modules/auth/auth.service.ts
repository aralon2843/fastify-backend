import { verifyPassword } from '../../utils/hash';
import { LoginType } from './auth.schema';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../../errors/errors';
import { FastifyInstance } from 'fastify';

interface KnexResponse {
  login: string;
  salt: string;
  password_hash: string;
}

export const authService = (fastify: FastifyInstance) => ({
  async validateUser({ login, password }: LoginType): Promise<string | Error> {
    const [user] = await fastify.knex
      .select<KnexResponse[]>(['login', 'password_hash', 'password_salt.salt'])
      .from('user')
      .innerJoin('password_salt', 'user.id', 'password_salt.user_id')
      .where({ login });

    if (!user.login) return new Error(USER_NOT_FOUND_ERROR);
    const isPasswordCorrect = verifyPassword(password, user.salt, user.password_hash);
    if (!isPasswordCorrect) return new Error(WRONG_PASSWORD_ERROR);
    return user.login;
  },
});
