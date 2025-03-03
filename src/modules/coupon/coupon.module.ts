import { Module } from '@nestjs/common'
import { CouponService } from './coupon.service'
import { CouponController } from './coupon.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CategoryModule } from '../category/category.module'

@Module({
  imports: [
    CategoryModule,
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: proxyName.name,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            port: configService.getOrThrow('REDIS_PORT'),
            host: configService.getOrThrow('REDIS_HOST'),
            password: configService.getOrThrow('REDIS_PASSWORD'),
            tls: { servername: configService.getOrThrow('REDIS_HOST') },
            retryAttempts: 3,
            retryDelay: 10000,
          },
        }),
      },
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: proxyName.name_read,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.getOrThrow('REDIS_HOST'),
            port: configService.getOrThrow('REDIS_PORT'),
            retryAttempts: 10,
            retryDelay: 3000,
            reconnectOnError(err) {
              // Lógica personalizada para reconectar en ciertos casos
              const targetError = 'READONLY'
              console.log(err)

              if (err.message.includes(targetError)) {
                return true // Reintentar reconexión si el error coincide
              }
              return false
            },
          },
        }),
      },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
