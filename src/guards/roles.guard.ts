import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { ROLES } from 'src/decorators/role.decorator'
import { AuthService } from 'src/modules/auth/auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly url_client = process.env.URL_CLIENT || 'localhost'
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride(ROLES, [
      context.getHandler(),
      context.getClass(),
    ])
    const request: Request = context.switchToHttp().getRequest()
    const host = request.hostname

    if (host === this.url_client || host === this.url_client) return true

    const payload = await this.authService.getCookiesPayloadToken(request)

    return RolesGuard.includeRoles(roles, payload.role)
  }

  private static includeRoles(roles: string[], verifyRole: string) {
    const roleVerify = roles.some((role) => role === verifyRole)

    if (!roleVerify)
      throw new BadRequestException({
        message: 'Insufficient permissions',
        statusCode: HttpStatus.FORBIDDEN,
      })
    return true
  }
}
