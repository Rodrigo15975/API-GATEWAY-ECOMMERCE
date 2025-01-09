import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { configPublish } from './common/config-rabbitMQ'
import { CreateClientDto } from './dto/create-client.dto'

@Injectable()
export class ClientsService {
  private readonly logger: Logger = new Logger(ClientsService.name)
  private readonly randomUUID: string = randomUUID().toString()
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async create(createClientDto: CreateClientDto) {
    console.log({
      createClientDto,
    })
  }
  async createCuponIfUserNotExists(
    userIdGoogle: string,
    emailGoogle: string,
    nameGoogle: string,
  ) {
    try {
      this.logger.verbose(
        `Message sent to: ${configPublish.ROUTING_EXCHANGE_CREATE_COUPON} `,
      )
      return await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_CREATE_COUPON,
        routingKey: configPublish.ROUTING_ROUTINGKEY_CREATE_COUPON,
        payload: { userIdGoogle, emailGoogle, nameGoogle },
        correlationId: this.randomUUID,
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

  async findOne(userIdGoogle: string) {
    try {
      this.logger.verbose('Send find one client', userIdGoogle)
      return await this.amqpConnection.request<FindOneClient>({
        exchange: configPublish.ROUTING_EXCHANGE_GET_ONE_CLIENT,
        routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ONE_CLIENT,
        payload: { userIdGoogle },
        correlationId: this.randomUUID,
        timeout: 10000,
      })
    } catch (error) {
      console.log({
        error,
      })

      this.logger.error('Error get one client', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  async findAll() {
    try {
      return await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_GET_ALL_CLIENTS,
        routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ALL_CLIENTS,
        payload: {},
        correlationId: this.randomUUID,
        timeout: 10000,
        expiration: 10000,
      })
    } catch (error) {
      this.logger.error('Error get all clients', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  async updateEspiryDateCouponForNewClient() {
    try {
      await this.amqpConnection.publish(
        configPublish.ROUTING_EXCHANGE_UPDATE_EXPIRY_DATE_COUPON,
        configPublish.ROUTING_ROUTINGKEY_UPDATE_EXPIRY_DATE_COUPON,
        {},
      )
    } catch (error) {
      this.logger.error('Error send to:  updateEspiryCouponClient', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }
}
