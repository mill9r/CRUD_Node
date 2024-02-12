import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { UserDao } from './user-dao.interface';
import { isUserExist } from './user-dao.validators';

export const userDao = (): UserDao => {
  const users = new Map<string, User>();
  return {
    get: async () => {
      return Array.from(users.values()) as User[];
    },
    getById: async (id: string) => {
      isUserExist(id, users);
      return users.get(id) as User;
    },
    create: async (user: User) => {
      const id = uuidv4();
      users.set(id, {
        id,
        ...user,
      });
      return users.get(id) as User;
    },
    update: async (id: string, user: User) => {
      isUserExist(id, users);
      const updatedUser = { ...users.get(id), ...user };
      users.set(id, updatedUser);
      return updatedUser;
    },
    delete: async (id: string) => {
      isUserExist(id, users);
      return users.delete(id);
    },
  };
};
