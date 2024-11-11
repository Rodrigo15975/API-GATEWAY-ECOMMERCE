import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { CouponService } from './coupon.service'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { UpdateCouponDto } from './dto/update-coupon.dto'
import { RolesGuard } from 'src/guards/roles.guard'
import {
  ADMIN,
  DEV,
  EMPLOYEE,
  RolesDefault,
} from 'src/decorators/role.decorator'
import { ApiTags } from '@nestjs/swagger'

@Controller('coupon')
@ApiTags('MICROSERVICES-COUPON')
@UseGuards(RolesGuard)
@RolesDefault([ADMIN, DEV, EMPLOYEE])
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto)
  }

  @Get()
  findAll() {
    return this.couponService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id)
  }
}
