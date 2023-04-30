import { Static, Type } from '@sinclair/typebox';

export const Login = Type.Object({
  login: Type.String(),
  password: Type.String(),
});

export type LoginType = Static<typeof Login>;

export type SignInType = LoginType & { name: string };
