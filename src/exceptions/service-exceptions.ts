export class ServiceUuidIsInvalidException extends Error {
  constructor(message = 'Service UUID is invalid!') {
    super(message);
    this.name = 'ServiceUuidIsInvalidException';
  }
}


export class ServiceInvalidUserException extends Error {
  constructor(message = 'Invalid user!') {
    super(message);
    this.name = 'ServiceInvalidUserException';
  }
}
