import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
// import { Cron, CronExpression } from '@nestjs/schedule'
import { CouponService } from '../coupon/coupon.service'
import { expiredDateVerification } from 'src/utils/verificationDate'
import { Cron, CronExpression } from '@nestjs/schedule'
import { CategoryService } from '../category/category.service'
import { ClientsService } from '../clients/clients.service'
@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name)
  constructor(
    private readonly couponService: CouponService,
    private readonly categoryService: CategoryService,
    private readonly clientsService: ClientsService,
  ) {
    this.logger.verbose('CronJobService initialized')
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async verifyExpiredCouponClient() {
    try {
      this.logger.verbose('Message sent to: updateEspiryCouponsClients ')
      await this.clientsService.updateEspiryDateCouponForNewClient()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error)
    }
  }

  private async findAllCoupons() {
    try {
      return await this.couponService.findAll()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error)
    }
  }
  private async findAllCategoryWithDiscount() {
    try {
      return await this.categoryService.findAll()
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error)
    }
  }

  // Se ejecuta a las 23:59 todos los días
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async verifyDiscountOfCategory() {
    try {
      this.logger.log('Initial verification discount category  ')
      const categories = await this.findAllCategoryWithDiscount()

      const categoriesWithDiscount = categories.filter(
        (category) => category?.discountRules?.length > 0,
      )
      const verifyDateExpiredDiscount = categoriesWithDiscount.find(
        (discount) =>
          expiredDateVerification(discount.discountRules[0].end_date),
      )
      if (verifyDateExpiredDiscount) {
        const addVerification: FindAllCategory = {
          ...verifyDateExpiredDiscount,
          discountRules: [
            {
              ...verifyDateExpiredDiscount.discountRules[0],
              is_active: false,
            },
          ],
        }
        await this.categoryService.verifyDiscountOfCategory(addVerification)
        this.logger.log('Finish verification discount category  ')
      }
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
