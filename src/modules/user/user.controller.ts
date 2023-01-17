import { UserWithoutPasswordType } from "./user.schema";
import { getAll } from "./user.service";

export async function getAllHandler(): Promise<UserWithoutPasswordType[]> {
  return await getAll();
}
