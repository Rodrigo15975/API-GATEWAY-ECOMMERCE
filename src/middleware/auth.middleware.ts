import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common'
import { NextFunction, Request } from 'express'
import { AuthService } from 'src/modules/auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  private readonly logger: Logger = new Logger(AuthMiddleware.name)

  async use(req: Request, _: Response, next: NextFunction) {
    const token = this.authService.getTokenCookies(req)
    try {
      await this.authService.verifyToken(token)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error)
    }

    next() // continuar a la siguiente función middleware o controlador
  }
}
