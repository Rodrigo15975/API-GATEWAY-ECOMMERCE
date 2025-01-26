import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/:totalPrice/:emailUser/:idUser')
  create(
    @Body() createPaymentDto: CreatePaymentDto[],
    @Param('totalPrice') totalPrice: number,
    @Param('emailUser') emailUser: string,
    @Param('idUser') idUser: string,
  ) {
    return this.paymentService.create(
      createPaymentDto,
      totalPrice,
      emailUser,
      idUser,
    )
  }

  @Get()
  findAll() {
    return this.paymentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id)
  }
}
