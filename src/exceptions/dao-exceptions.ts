export class DaoUserNotExistError extends Error {
  constructor(message = 'User does not exist!') {
    super(message);
    this.name = 'DaoUserNotExistError';
  }
}
