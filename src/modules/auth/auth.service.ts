import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  Req,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Request } from 'express'
import { firstValueFrom } from 'rxjs'
import {
  AUTH_LOGIN,
  DECODED_TOKEN,
  VERIFY_TOKEN,
} from './common/auth-event-pattern'
import { authPattern } from './common/auth.pattern'
import { AuthData } from './dto/auth-data.dto'

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name)

  constructor(
    @Inject(authPattern.name) private readonly authClient: ClientProxy,
  ) {}

  async signIn(authDto: AuthData) {
    try {
      return await firstValueFrom(this.authClient.send(AUTH_LOGIN, authDto))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   *
   * @param token for verify token in middleware, guard
   * @returns
   */
  async verifyToken(token: string) {
    try {
      return await firstValueFrom(this.authClient.send(VERIFY_TOKEN, token))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  /**
   *
   * @param token decoded for use in guard
   * @returns
   */
  async decodedToken(token: string): Promise<{
    payload: {
      id: number
      role: string
    }
  }> {
    try {
      return await firstValueFrom(this.authClient.send(DECODED_TOKEN, token))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   *
   * @param req for middleware use
   * @returns
   */

  getTokenCookies(@Req() req: Request): string {
    const token = req.cookies.auth
    if (!token) {
      throw new BadRequestException({
        message: 'Required Token',
        statusCode: HttpStatus.BAD_REQUEST,
      })
    }

    return token
  }
  /**
   *
   * @param request for use middleware, guard and interceptor
   * @returns
   */
  async getCookiesPayloadToken(request: Request | any) {
    try {
      const token = this.getTokenCookies(request)
      const { payload } = await this.decodedToken(token)
      if (!payload.id && !payload.role)
        throw new BadRequestException({
          message: 'Invalid token',
        })
      return payload
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
