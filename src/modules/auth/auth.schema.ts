import { Static, Type } from "@sinclair/typebox";
import { UserType } from "../user/user.schema";

export type SignInType = Omit<UserType, "id">;

export const Login = Type.Object({
  login: Type.String(),
  password: Type.String(),
});
export type LoginType = Static<typeof Login>;
