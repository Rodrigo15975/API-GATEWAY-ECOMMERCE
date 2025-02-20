import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName'
import { AuthModule } from '../auth/auth.module'
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data'
import { HttpModule } from '@nestjs/axios'
import { ImagesService } from './services/image.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    HttpModule,
    AuthModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
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
            connectTimeout: 5000,
          },
        }),
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ImagesService],
})
export class ProductsModule {}
