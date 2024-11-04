import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from 'src/modules/auth/auth.service'
import { UserService } from 'src/modules/user/user.service'
@Injectable()
export class GetProfileAhuthInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  private readonly logger: Logger = new Logger(GetProfileAhuthInterceptor.name)
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest()
      const payload = await this.authService.getCookiesPayloadToken(request)
      const user = await this.userService.findOne(payload.id)
      request['user'] = user
    } catch (error) {
      this.logger.error(error)
    }
    return next.handle()
  }
}
