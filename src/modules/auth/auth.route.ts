import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { LoginType, SignInType } from './auth.schema';
import { userService } from '../user/user.service';
import { ALREADY_REGISTERED_USERNAME_ERROR } from '../../errors/errors';
import { authService } from './auth.service';

async function authRoute(fastify: FastifyInstance, options: Object, done: Function) {
  const _userService = userService(fastify);
  const _authService = authService(fastify);

  fastify.post('/signin', async (request: FastifyRequest<{ Body: SignInType }>, reply: FastifyReply) => {
    const { name, login, password } = request.body;
    const user = await _userService.findUserByLogin(login);

    if (user) {
      reply.code(409);
      return new Error(ALREADY_REGISTERED_USERNAME_ERROR);
    }

    const response = await _userService.createUser({ name, login, password });
    if (response instanceof Error) {
      reply.code(500);
      return { error_message: response };
    } else {
      reply.code(201);
      return { message: 'User created successfully', user_id: response };
    }
  });

  fastify.post('/login', async (request: FastifyRequest<{ Body: LoginType }>, reply: FastifyReply) => {
    const { login, password } = request.body;
    const response = await _authService.validateUser({ login, password });

    if (response instanceof Error) {
      reply.code(401).header('WWW-Authenticate', 'Basic realm="Access to the staging site"');
      return response;
    }

    const token = fastify.jwt.sign({ payload: response });
    return { token };
  });
  done();
}

export default authRoute;
