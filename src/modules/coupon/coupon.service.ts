import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { UpdateCouponDto } from './dto/update-coupon.dto'
import { proxyName } from './common/proxyName'
import { ClientProxy } from '@nestjs/microservices'
import { COUPON_CREATE } from './common/patterNameWrite'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class CouponService {
  constructor(
    @Inject(proxyName.name) private readonly couponClient: ClientProxy,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    try {
      return await firstValueFrom(
        this.couponClient.send(COUPON_CREATE, createCouponDto),
      )
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)
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
