export class DaoNotExistError extends Error {
  constructor(message = 'User does not exist!') {
    super(message);
    this.name = 'DaoUserNotExistError';
  }
}
