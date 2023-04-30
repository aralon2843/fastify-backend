import { Static, Type } from '@sinclair/typebox';

export const User = Type.Object({
  id: Type.Number(),
  name: Type.String({ maxLength: 60 }),
  login: Type.String({ maxLength: 30 }),
  password_hash: Type.String(),
});
export type UserType = Static<typeof User>;
export type UserWithoutPasswordType = Omit<UserType, 'password'>;
