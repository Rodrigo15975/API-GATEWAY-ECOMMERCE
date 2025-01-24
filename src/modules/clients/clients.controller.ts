import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { CreateReview } from './dto/create-client.dto'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('review')
  createReview(@Body() createNewReview: CreateReview) {
    return this.clientsService.createNewView(createNewReview)
  }

  @Post(':idGoogle')
  createCuponIfClientNotExists(
    @Param('idGoogle') idGoogle: string,
    @Query('emailGoogle') emailGoogle: string,
    @Query('nameGoogle') nameGoogle: string,
  ) {
    return this.clientsService.createCuponIfUserNotExists(
      idGoogle,
      emailGoogle,
      nameGoogle,
    )
  }
  @Get('coupon/:idGoogle/:coupon')
  findOneCouponClient(
    @Param('idGoogle') idGoogle: string,
    @Param('coupon') coupon: string,
  ) {
    return this.clientsService.findOneCouponClient(idGoogle, coupon)
  }

  @Get()
  findAll() {
    return this.clientsService.findAll()
  }
  @Get(':idGoogle')
  findOne(@Param('idGoogle') idGoogle: string) {
    return this.clientsService.findOne(idGoogle)
  }

  @Get('verify/:idGoogle')
  findOneVerify(
    @Param('idGoogle') idGoogle: string,
    @Query('verify') verify: boolean,
  ) {
    return this.clientsService.findOneVerify(idGoogle, verify)
  }
}
