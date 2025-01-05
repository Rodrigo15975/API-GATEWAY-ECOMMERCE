import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { configPublish } from './common/config-rabbitMQ'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { randomUUID } from 'crypto'

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
      this.logger.verbose(
        `Message sent to: ${configPublish.ROUTING_EXCHANGE_CREATE_COUPON} `,
      )
      return await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_CREATE_COUPON,
        routingKey: configPublish.ROUTING_ROUTINGKEY_CREATE_COUPON,
        payload: idGoogle,
        correlationId: randomUUID().toString(),
        timeout: 10000,
      })
    } catch (error) {
      this.logger.error(
        'Error publish with coupon create if user not exists',
        error,
      )
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  async findAll() {
    try {
      return await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_GET_ALL_CLIENTS,
        routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ALL_CLIENTS,
        payload: {},
        correlationId: randomUUID().toString(),
        timeout: 10000,
        expiration: 10000,
      })
    } catch (error) {
      this.logger.error('Error get all clients', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }
  async findAllOnlyCouponsClients() {
    try {
      return await this.amqpConnection.request<FindAllOnlyCouponsClients[]>({
        exchange: configPublish.ROUTING_EXCHANGE_GET_ALL_CLIENTS_ONLY_COUPONS,
        routingKey:
          configPublish.ROUTING_ROUTINGKEY_GET_ALL_CLIENTS_ONLY_COUPONS,
        payload: {},
        correlationId: randomUUID().toString(),
        timeout: 10000,
        expiration: 10000,
      })
    } catch (error) {
      this.logger.error('Error get all clients', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
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
