import { verifyPassword } from "../../utils/hash";
import { User } from "../user/user.model";

import { findUserByLoginWithPassword } from "../user/user.service";
import { LoginType } from "./auth.schema";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./constants";

export const validateUser = async ({
  login,
  password,
}: LoginType): Promise<User | Error> => {
  const user = await findUserByLoginWithPassword(login);

  if (!user) return new Error(USER_NOT_FOUND_ERROR);

  const correctPassword = verifyPassword(password, user.salt, user.password);
  if (!correctPassword) return new Error(WRONG_PASSWORD_ERROR);

  return user;
};
