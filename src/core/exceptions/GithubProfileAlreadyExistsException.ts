export default class GithubProfileAlreadyExistsException extends Error {
  statusCode: number;

  constructor() {
    super('Github Profile already in use');
    this.name = 'GithubProfileAlreadyExistsException';
    this.statusCode = 409;
  }
}
