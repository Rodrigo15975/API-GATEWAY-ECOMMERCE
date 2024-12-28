import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
// import { Cron, CronExpression } from '@nestjs/schedule'
import { CouponService } from '../coupon/coupon.service'
import { expiredDateVerification } from 'src/utils/verificationDate'
import { Cron, CronExpression } from '@nestjs/schedule'
@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name)
  constructor(private readonly couponService: CouponService) {}

  private async findAllCoupons() {
    try {
      return await this.couponService.findAll()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error)
    }
  }

  // Se ejecuta a las 23:59 todos los días
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async verifyCouponDateExpired() {
    try {
      this.logger.log('Initial verification discount coupon  ')
      const coupons = await this.findAllCoupons()
      const findOneCoupon = coupons.find((coupon) =>
        expiredDateVerification(coupon.espiryDate),
      )
      if (findOneCoupon) {
        const addVerification = { ...findOneCoupon, isExpiredDate: true }
        await this.couponService.verifyCouponDateExpired(addVerification)
        this.logger.log('Finish verification discount coupon  ')
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error)
    }
  }
}
