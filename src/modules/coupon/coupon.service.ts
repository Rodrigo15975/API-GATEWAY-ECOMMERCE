import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { COUPON_CREATE } from './common/patterNameWrite'
import { proxyName } from './common/proxyName'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { UpdateCouponDto } from './dto/update-coupon.dto'

@Injectable()
export class CouponService {
  private readonly logger: Logger = new Logger(CouponService.name)
  constructor(
    @Inject(proxyName.name) private readonly couponClient: ClientProxy,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    try {
      return await firstValueFrom(
        this.couponClient.send(COUPON_CREATE, createCouponDto),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  findAll() {
    return `This action returns all coupon`
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    console.log(updateCouponDto)

    return `This action updates a #${id} coupon`
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`
  }
}
