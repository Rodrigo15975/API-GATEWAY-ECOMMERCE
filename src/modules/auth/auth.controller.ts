import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthData } from './dto/auth-data.dto'

@ApiTags('microservices-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successfully',
  })
  async signIn(
    @Body() data: AuthData,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isProduction = process.env.NODE_ENV === 'production'
    const auth = await this.authService.signIn(data)
    res.cookie('auth', auth, {
      // si pones en true, una vez actualizada la pagina en el front
      // se pierde las cookies sale undefined
      sameSite: isProduction ? 'none' : 'lax', // SameSite=None solo para producción
      secure: isProduction, // Secure=true solo en producción (HTTPS)
      httpOnly: true,
    })

    res.send({ auth, statusCode: HttpStatus.OK })
  }

  @Get('verify-token/:token')
  verifyToken(@Param('token') token: string) {
    return this.authService.verifyToken(token)
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.cookie('auth', '', {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
        // path: '/',
      })

      res.send({
        auth: '',
        statusCode: HttpStatus.OK,
        success: true,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error logging out' })
    }
  }
}
