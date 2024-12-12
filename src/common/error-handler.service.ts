import { HttpException, HttpStatus } from '@nestjs/common'

export class ErrorHandlerService {
  static handleError(error: any, path: string): HttpException {
    throw new HttpException(
      {
        statusCode: error?.status || error.response.statusCode,
        message: error?.message || error,
        timestamp: new Date().toISOString(),
        path: `Service: /${path}`,
      },
      error?.statusCode || error.status,
    )
  }
  static handleTimeoutError(error: any, path: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.REQUEST_TIMEOUT || error.response.statusCode,
        message: error.message || error,
        details:
          'The microservice did not respond within the expected time frame.',
        timestamp: new Date().toISOString(),
        path: `Service: /${path}`,
      },
      HttpStatus.REQUEST_TIMEOUT,
    )
  }
}
