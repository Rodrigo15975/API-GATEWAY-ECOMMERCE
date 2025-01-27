import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { CouponModule } from '../coupon/coupon.module'
import { CategoryModule } from '../category/category.module'
import { CronJobService } from './cron-job.service'
import { ClientsModule } from '../clients/clients.module'

@Module({
  imports: [
    CategoryModule,
    ScheduleModule.forRoot(),
    CouponModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [CronJobService],
})
export class CronJobModule {}
