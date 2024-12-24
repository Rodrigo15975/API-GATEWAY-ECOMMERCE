import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CouponService } from './coupon.service'
import { CreateCouponDto } from './dto/create-coupon.dto'

import { ApiTags } from '@nestjs/swagger'
import {
  ADMIN,
  DEV,
  EMPLOYEE,
  RolesDefault,
} from 'src/decorators/role.decorator'
import { RolesGuard } from 'src/guards/roles.guard'

@Controller('coupon')
@ApiTags('MICROSERVICES-COUPON')
@UseGuards(RolesGuard)
@RolesDefault([ADMIN, DEV, EMPLOYEE])
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  createOrUpdate(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.createOrUpdate(createCouponDto)
  }
  @Patch()
  update(@Body() updateCouponDto: CreateCouponDto) {
    return this.couponService.createOrUpdate(updateCouponDto)
  }

  @Get()
  findAll() {
    return this.couponService.findAll()
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id)
  }
}
