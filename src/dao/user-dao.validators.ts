import { User } from "../models/user.model";
import { DaoUserNotExistError } from "../exceptions/dao-exceptions";

const isUserExist = (id: string, users: Map<string, User>) => {
  if (!users.has(id)) {
    throw new DaoUserNotExistError();
  }
};

export { isUserExist };
