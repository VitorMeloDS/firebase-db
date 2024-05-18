import { HttpMessage } from './http.message';
import { HttpStatus } from './http.status';

export class HttpException extends Error {
  public status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export class HttpBadRequest extends HttpException {
  constructor(message: string = HttpMessage.BAD_REQUEST) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class HttpNotFound extends HttpException {
  constructor(message: string = HttpMessage.NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class HttpServerError extends HttpException {
  public originalError: Error;

  constructor(originalError: Error) {
    super(HttpMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    this.originalError = originalError;
  }
}