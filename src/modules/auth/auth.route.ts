import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { loginHandler, signinHandler } from "./auth.controller";
import { LoginType } from "./auth.schema";

async function authRoute(
  fastify: FastifyInstance,
  options: Object,
  done: Function,
) {
  fastify.post("/signin", signinHandler);

  fastify.post(
    "/login",
    (request: FastifyRequest<{ Body: LoginType }>, reply: FastifyReply) =>
      loginHandler(fastify, request, reply),
  );
  done();
}

export default authRoute;
