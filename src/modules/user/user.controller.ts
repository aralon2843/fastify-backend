import { UserType, LoginType, RegisterType, UserWithoutPasswordType } from './user.schema';
import { ALREADY_REGISTERED_USERNAME_ERROR } from './constants';
import { createUser, findByLogin, validateUser, getAll } from './user.service';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterType }>,
  reply: FastifyReply
): Promise<Omit<UserType, 'password'> | Error> {
  const login = await findByLogin(request.body.login);

  if (login) {
    reply.code(409);
    return new Error(ALREADY_REGISTERED_USERNAME_ERROR);
  }

  return await createUser(request.body);
}

export async function loginHandler(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: LoginType }>,
  reply: FastifyReply
): Promise<{ token: string } | Error> {
  const { login, password } = request.body;
  const response = await validateUser({ login, password });

  if (response instanceof Error) {
    reply.code(401).header('WWW-Authenticate', 'Basic realm="Access to the staging site"');
    return response;
  }
  const token = fastify.jwt.sign({ payload: response.login });

  return {
    token,
  };
}

export async function getAllHandler(): Promise<UserWithoutPasswordType[]> {
  return await getAll();
}
