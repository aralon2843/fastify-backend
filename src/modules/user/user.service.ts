import { UserWithoutPasswordType } from "./user.schema";
import { AppDataSource } from "./../../plugins/db-connector";
import { User } from "./user.model";
import { hashPassword } from "../../utils/hash";
import { SignInType } from "../auth/auth.schema";
import { UpdateResult } from "typeorm";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async ({
  name,
  login,
  password,
}: SignInType): Promise<UserWithoutPasswordType> => {
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

export const findUserByLogin = async (login: string): Promise<User | null> => {
  return await userRepository.findOneBy({ login });
};

export const findUserByLoginWithPassword = async (
  login: string,
): Promise<User | null> => {
  return userRepository
    .createQueryBuilder("user")
    .select("user")
    .where("login = :login", { login })
    .addSelect("user.password")
    .addSelect("user.salt")
    .getOne();
};

export const getAll = async (): Promise<UserWithoutPasswordType[]> => {
  return await userRepository.find();
};
