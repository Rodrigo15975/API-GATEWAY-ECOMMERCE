import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiAcceptedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ClientsService } from './clients.service'
import { CreateReview } from './dto/create-client.dto'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('ordersClient/:idGoogle')
  async ordersClientByUseId(@Param('idGoogle') idGoogle: string) {
    return await this.clientsService.ordersClientByUseId(idGoogle)
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @Post('review')
  createReview(@Body() createNewReview: CreateReview) {
    return this.clientsService.createNewView(createNewReview)
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
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

  @Get('successPayment')
  successPayment() {
    return this.clientsService.successPayment()
  }

  @ApiAcceptedResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.ACCEPTED,
  })
  @Get('coupon/:idGoogle/:coupon')
  findOneCouponClient(
    @Param('idGoogle') idGoogle: string,
    @Param('coupon') coupon: string,
  ) {
    return this.clientsService.findOneCouponClient(idGoogle, coupon)
  }

  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
  })
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
