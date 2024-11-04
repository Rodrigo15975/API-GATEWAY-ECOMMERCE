import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: proxyName.name,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
