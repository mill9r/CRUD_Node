import { UserDao } from '../dao/user-dao.interface';
import { User } from '../models/user.model';
import { UserService } from './user-service.interface';
import {
  isIdValid,
  isUserAgeValid,
  isUserHobbiesValid,
  isUserNameValid,
} from './user-service.validators';

export const userService = (deps: UserDao): UserService => {
  return {
    get: async () => {
      return deps.get();
    },
    getById: async (id: string) => {
      isIdValid(id);
      return deps.getById(id);
    },
    create: async (user: User) => {
      isUserNameValid(user);
      isUserAgeValid(user);
      isUserHobbiesValid(user);
      return deps.create(user);
    },
    update: async (id: string, user: User) => {
      isIdValid(id);
      if (user.username) {
        isUserNameValid(user);
        return deps.update(id, user);
      }
      if (user.age) {
        isUserAgeValid(user);
        return deps.update(id, user);
      }
      if (user.hobbies) {
        isUserHobbiesValid(user);
        return deps.update(id, user);
      }
      return deps.getById(id);
    },
    delete: async (id: string) => {
      isIdValid(id);
      return deps.delete(id);
    },
  };
};
