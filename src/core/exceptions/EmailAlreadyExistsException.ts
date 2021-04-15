export default class EmailAlreadyExistsException extends Error {
  statusCode: number;

  constructor() {
    super('E-mail already in use');
    this.name = 'EmailAlreadyExistsException';
    this.statusCode = 409;
  }
}
