import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { DaoNotExistError } from '../exceptions/dao-exceptions';
import { UserDao } from './user-dao.interface';

export const userDao = (): UserDao => {
  const users = new Map<string, User>();
  return {
    get: async () => {
      return Array.from(users.values()) as User[];
    },
    getById: async (id: string) => {
      isUserNotExist(id, users);
      return users.get(id) as User;
    },
    create: async (user: User) => {
      const id = uuidv4();
      users.set(uuidv4(), {
        id,
        ...user,
      });
      return users.get(id) as User;
    },
    update: async (id: string, user: User) => {
      isUserNotExist(id, users);

      users.set(id, { ...users.get(id), ...user });
    },
    delete: async (id: string) => {
      isUserNotExist(id, users);
      return users.delete(id);
    },
  };
};

const isUserNotExist = (id: string, users: Map<string, User>) => {
  if (!users.has(id)) {
    throw new DaoNotExistError();
  }
};
