import { FastifyInstance } from "fastify";

import { getAllHandler } from "./user.controller";

async function userRoutes(
  fastify: FastifyInstance,
  options: Object,
  done: Function,
) {
  fastify.get("/all", getAllHandler);

  done();
}

export default userRoutes;
