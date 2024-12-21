import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { handleObservableError } from 'src/common/handleObservableError'
import {
  COUPON_CREATE,
  COUPON_GET_ALL_READ,
  COUPON_REMOVE,
} from './common/patterNameWrite'
import { proxyName } from './common/proxyName'
import { CreateCouponDto } from './dto/create-coupon.dto'

@Injectable()
export class CouponService {
  private readonly logger: Logger = new Logger(CouponService.name)
  constructor(
    @Inject(proxyName.name) private readonly couponClient: ClientProxy,
  ) {}

  async createOrUpdate(createCouponDto: CreateCouponDto) {
    try {
      return await firstValueFrom(
        this.couponClient
          .send(COUPON_CREATE, createCouponDto)
          .pipe(timeout(5000), handleObservableError(CouponService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, CouponService.name)
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.couponClient
          .send(COUPON_GET_ALL_READ, {})
          .pipe(timeout(5000), handleObservableError(CouponService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, CouponService.name)
    }
  }

  async remove(id: number) {
    try {
      return await firstValueFrom(
        this.couponClient
          .send(COUPON_REMOVE, id)
          .pipe(timeout(5000), handleObservableError(CouponService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, CouponService.name)
    }
  }
}
