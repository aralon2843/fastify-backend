import { Static, Type } from '@sinclair/typebox';

export const User = Type.Object({
  id: Type.Number(),
  name: Type.String({ maxLength: 60 }),
  login: Type.String({ maxLength: 30 }),
  password: Type.String(),
});
export type UserType = Static<typeof User>;
export type UserWithoutPasswordType = Omit<UserType, 'password'>;

export type RegisterType = Omit<UserType, 'id'>;

export const Login = Type.Object({
  login: Type.String(),
  password: Type.String(),
});
export type LoginType = Static<typeof Login>;
