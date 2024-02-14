import { validate } from "uuid";
import { ServiceInvalidUserException, ServiceUuidIsInvalidException } from "../exceptions/service-exceptions";
import { User } from "../models/user.model";
import { AGE_INVALID, HOBBIES_INVALID, ID_INVALID, USERNAME_INVALID } from "../constants/exception.constant";

const isIdValid = (id: string) => {
  if (!validate(id)) {
    throw new ServiceUuidIsInvalidException(ID_INVALID);
  }
};

const isUserNameValid = (user: User) => {
  if (!user.username) {
    throw new ServiceInvalidUserException(USERNAME_INVALID);
  }
};

const isUserAgeValid = (user: User) => {
  if (!user.age || !Number.isInteger(user.age) || user.age < 0) {
    throw new ServiceInvalidUserException(AGE_INVALID);
  }
};

const isUserHobbiesValid = (user: User) => {
  if (
    !user.hobbies ||
    !Array.isArray(user.hobbies) ||
    user.hobbies.length === 0
  ) {
    throw new ServiceInvalidUserException(HOBBIES_INVALID);
  }
};

export {
  isIdValid,
  isUserNameValid,
  isUserAgeValid,
  isUserHobbiesValid,
}
