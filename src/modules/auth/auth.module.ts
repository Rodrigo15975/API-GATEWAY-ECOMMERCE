import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { authPattern } from './common/auth.pattern'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [AuthModule],
        name: authPattern.name,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            port: configService.getOrThrow('REDIS_PORT'),
            host: configService.getOrThrow('REDIS_HOST'),
            password: configService.getOrThrow('REDIS_PASSWORD'),
            tls: { servername: configService.getOrThrow('REDIS_HOST') },
            retryAttempts: 10,
            retryDelay: 10000,
            maxLoadingRetryTime: 90000,
            requestTimeout: 5000,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
