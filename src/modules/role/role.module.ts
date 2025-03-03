import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName/proxyName'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
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
        name: proxyName.name,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            port: configService.getOrThrow('REDIS_PORT'),
            host: configService.getOrThrow('REDIS_HOST'),
            password: configService.getOrThrow('REDIS_PASSWORD'),
            tls: { servername: configService.getOrThrow('REDIS_HOST') },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
