import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserType } from "../user/user.schema";
import { createUser, findUserByLogin } from "../user/user.service";
import { LoginType, SignInType } from "./auth.schema";
import { validateUser } from "./auth.service";
import { ALREADY_REGISTERED_USERNAME_ERROR } from "./constants";

export async function signinHandler(
  request: FastifyRequest<{ Body: SignInType }>,
  reply: FastifyReply,
): Promise<Omit<UserType, "password"> | Error> {
  const login = await findUserByLogin(request.body.login);

  if (login) {
    reply.code(409);
    return new Error(ALREADY_REGISTERED_USERNAME_ERROR);
  }

  return await createUser(request.body);
}

export async function loginHandler(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: LoginType }>,
  reply: FastifyReply,
): Promise<{ token: string } | Error> {
  const { login, password } = request.body;
  const response = await validateUser({ login, password });

  if (response instanceof Error) {
    reply
      .code(401)
      .header("WWW-Authenticate", 'Basic realm="Access to the staging site"');
    return response;
  }
  const token = fastify.jwt.sign({ payload: response.login });

  return {
    token,
  };
}
