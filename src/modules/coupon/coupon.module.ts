import { Module } from '@nestjs/common'
import { CouponService } from './coupon.service'
import { CouponController } from './coupon.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName'

@Module({
  imports: [
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
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
