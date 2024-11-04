import { RpcException } from '@nestjs/microservices';

export class UserExistsException extends RpcException {
  constructor(field: string) {
    super({
      message: `Existing ${field}`,
      statusCode: 400,
    });
  }
}