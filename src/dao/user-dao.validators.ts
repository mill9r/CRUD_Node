import { User } from "../models/user.model";
import { DaoUserNotExistError } from "../exceptions/dao-exceptions";
import { DAO_USER_NOT_EXIST } from "../constants/exception.constant";

const isUserExist = (id: string, users: Map<string, User>) => {
  if (!users.has(id)) {
    throw new DaoUserNotExistError(DAO_USER_NOT_EXIST);
  }
};

export { isUserExist };
