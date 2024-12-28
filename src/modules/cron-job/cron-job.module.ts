import { Module } from '@nestjs/common'
import { CronJobService } from './cron-job.service'
// import { CronJobController } from './cron-job.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { CouponModule } from '../coupon/coupon.module'

@Module({
  imports: [ScheduleModule.forRoot(), CouponModule],
  controllers: [],
  providers: [CronJobService],
})
export class CronJobModule {}
