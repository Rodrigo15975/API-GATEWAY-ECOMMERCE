import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthModule } from '../auth/auth.module'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { proxyName } from './common/proxyName'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
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
        name: proxyName.nameWrite,
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
        name: proxyName.nameRead,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.getOrThrow('REDIS_HOST'),
            port: configService.getOrThrow('REDIS_PORT'),
            retryAttempts: 3,
            retryDelay: 10000,
          },
        }),
      },
    ]),
    AuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
