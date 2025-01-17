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
  private readonly url_client = process.env.URL_CLIENT
  constructor(private readonly authService: AuthService) {}
  private readonly logger: Logger = new Logger(AuthMiddleware.name)

  async use(req: Request, _: Response, next: NextFunction) {
    const host = req.hostname
    if (host === this.url_client) return next()

    try {
      const token = this.authService.getTokenCookies(req)
      await this.authService.verifyToken(token)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error)
    }

    next() // continuar a la siguiente función middleware o controlador
  }
}
