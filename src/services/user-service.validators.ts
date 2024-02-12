import { validate } from "uuid";
import { ServiceInvalidUserException, ServiceUuidIsInvalidException } from "../exceptions/service-exceptions";
import { User } from "../models/user.model";

const isIdValid = (id: string) => {
  if (!validate(id)) {
    throw new ServiceUuidIsInvalidException();
  }
};

const isUserNameValid = (user: User) => {
  if (!user.username) {
    throw new ServiceInvalidUserException();
  }
};

const isUserAgeValid = (user: User) => {
  if (!user.age || !Number.isInteger(user.age) || user.age < 0) {
    throw new ServiceInvalidUserException();
  }
};

const isUserHobbiesValid = (user: User) => {
  if (
    !user.hobbies ||
    !Array.isArray(user.hobbies) ||
    user.hobbies.length === 0
  ) {
    throw new ServiceInvalidUserException();
  }
};

export {
  isIdValid,
  isUserNameValid,
  isUserAgeValid,
  isUserHobbiesValid,
}
