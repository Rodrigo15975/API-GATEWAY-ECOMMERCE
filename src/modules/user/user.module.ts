import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { proxyName } from './common/proxyName/proxyName'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: proxyName.name_write,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      {
        name: proxyName.name_read,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
