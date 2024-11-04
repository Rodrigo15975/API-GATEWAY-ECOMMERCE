import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { AuthData } from './dto/auth-data.dto'
import { authPattern } from './common/auth.pattern'
import { ClientProxy } from '@nestjs/microservices'
import {
  AUTH_LOGIN,
  DECODED_TOKEN,
  VERIFY_TOKEN,
} from './common/auth-event-pattern'
import { firstValueFrom } from 'rxjs'
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor(
    @Inject(authPattern.name) private readonly authClient: ClientProxy,
  ) {}

  async signIn(authDto: AuthData) {
    return await firstValueFrom(this.authClient.send(AUTH_LOGIN, authDto))
  }

  async verifyToken(token: string) {
    return await firstValueFrom(this.authClient.send(VERIFY_TOKEN, token))
  }

  async decodedToken(token: string): Promise<{
    payload: {
      id: number
      role: string
    }
  }> {
    return await firstValueFrom(this.authClient.send(DECODED_TOKEN, token))
  }

  getTokenCookies(req: Request | any): string {
    const [, token] = req.headers.cookie?.split('auth=') || []
    if (!token) throw new BadRequestException('Required Token')

    return token
  }
  async getCookiesPayloadToken(request: Request | any) {
    const token = this.getTokenCookies(request)
    const { payload } = await this.decodedToken(token)
    if (!payload.id && !payload.role)
      throw new BadRequestException({
        message: 'Invalid token',
      })
    return payload
  }
}
