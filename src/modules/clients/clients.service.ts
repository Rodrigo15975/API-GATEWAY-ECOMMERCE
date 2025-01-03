import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { configPublish } from './common/config-rabbitMQ'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Injectable()
export class ClientsService {
  private readonly logger: Logger = new Logger(ClientsService.name)
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async create(createClientDto: CreateClientDto) {
    console.log({
      createClientDto,
    })
  }
  async createCuponIfUserNotExists(idGoogle: string) {
    try {
      const response = await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_CREATE_COUPON,
        routingKey: configPublish.ROUTING_ROUTINGKEY_CREATE_COUPON,
        payload: idGoogle,
        correlationId: '123',
        timeout: 10000,
      })
      this.logger.verbose(
        `Message sent to: ${configPublish.ROUTING_EXCHANGE_CREATE_COUPON} `,
      )
      return response
    } catch (error) {
      this.logger.error(
        'Error publish with coupon create if user not exists',
        error,
      )
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  findAll() {
    return `This action returns all clients`
  }

  findOne(id: number) {
    return `This action returns a #${id} client`
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log('createClientDto', updateClientDto)

    return `This action updates a #${id} client`
  }

  remove(id: number) {
    return `This action removes a #${id} client`
  }
}
