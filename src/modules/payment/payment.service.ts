import { Injectable, Logger } from '@nestjs/common'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { randomUUID } from 'crypto'
import { configRabbit } from './common/config-rabbit'
import { gettingDataformatRight } from './utils/GettingDataformatRight'
@Injectable()
export class PaymentService {
  private timeOut = randomUUID().toString()
  private readonly logger: Logger = new Logger(PaymentService.name)
  constructor(private readonly amqConnection: AmqpConnection) {}

  async create(
    createPaymentDto: CreatePaymentDto[],
    totalPrice: number,
    emailUser: string,
    idUser: string,
    codeUsed: boolean,
  ) {
    const dataFormat = gettingDataformatRight(createPaymentDto)

    try {
      return await this.amqConnection.request({
        exchange: configRabbit.ROUTING_EXCHANGE_CREATE_PAYMENT,
        routingKey: configRabbit.ROUTING_ROUTINGKEY_CREATE_PAYMENT,
        payload: { dataFormat, totalPrice, emailUser, idUser, codeUsed },
        correlationId: this.timeOut,
        expiration: 30000,
        timeout: 30000,
      })
    } catch (error) {
      this.logger.error('Error create payment: ', error)
      throw ErrorHandlerService.handleError(error, PaymentService.name)
    }
  }

  findAll() {
    return `This action returns all payment`
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    console.log(updatePaymentDto)
    return `This action updates a #${id} payment`
  }

  remove(id: number) {
    return `This action removes a #${id} payment`
  }
}
