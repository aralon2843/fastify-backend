import { RegisterType, LoginType, UserWithoutPasswordType } from './user.schema';
import { hashPassword, verifyPassword } from './../../utils/hash';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './constants';
import { AppDataSource } from './../../plugins/db-connector';
import { User } from './user.model';

const userRepository = AppDataSource.getRepository(User);

export const findByLogin = async (
  login: string,
  withPassword: boolean = false
): Promise<User | null> => {
  if (withPassword)
    return userRepository
      .createQueryBuilder('user')
      .select('user')
      .where('login = :login', { login })
      .addSelect('user.password')
      .addSelect('user.salt')
      .getOne();
  return await userRepository.findOneBy({ login });
};

export const createUser = async ({
  name,
  login,
  password,
}: RegisterType): Promise<UserWithoutPasswordType> => {
  const { hash, salt } = hashPassword(password);

  const user = new User();
  user.name = name;
  user.login = login;
  user.password = hash;
  user.salt = salt;

  const createdUser = await userRepository.save(user);
  return {
    id: createdUser.id,
    name: createdUser.name,
    login: createdUser.login,
  };
};

export const validateUser = async ({ login, password }: LoginType): Promise<User | Error> => {
  const user = await findByLogin(login, true);
  console.log(user);
  if (!user) return new Error(USER_NOT_FOUND_ERROR);

  const correctPassword = verifyPassword(password, user.salt, user.password);
  if (!correctPassword) return new Error(WRONG_PASSWORD_ERROR);

  return user;
};

export const getAll = async (): Promise<UserWithoutPasswordType[]> => {
  return await userRepository.find();
};
