import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthModule } from '../auth/auth.module'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { proxyName } from './common/proxyName'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: proxyName.nameWrite,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      {
        name: proxyName.nameRead,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {
  
}
