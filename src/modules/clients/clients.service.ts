import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { configPublish } from './common/config-rabbitMQ'
import { CreateReview } from './dto/create-client.dto'

@Injectable()
export class ClientsService {
  private readonly logger: Logger = new Logger(ClientsService.name)
  private readonly randomUUID: string = randomUUID().toString()
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async ordersClientByUseId(userIdGoogle: string) {
    try {
      return await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_GET_ALL_ORDERS_CLIENT_ID,
        routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ALL_ORDERS_CLIENT_ID,
        payload: userIdGoogle,
        correlationId: `${this.randomUUID}-${userIdGoogle}-orders-client-id`,
        timeout: 30000,
        expiration: 30000,
      })
    } catch (error) {
      this.logger.error('Error get one client', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  async findOneCouponClient(userIdGoogle: string, code: string) {
    if (!userIdGoogle || !code) return
    try {
      return await this.amqpConnection.request({
        exchange: configPublish.ROUTING_EXCHANGE_VERIFY_COUPON_COUDE,
        routingKey: configPublish.ROUTING_ROUTINGKEY_VERIFY_COUPON_COUDE,
        payload: {
          code,
          userIdGoogle,
        },
        correlationId: this.randomUUID,
        timeout: 30000,
      })
    } catch (error) {
      this.logger.error('Error get one client coupon', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  async successPayment() {
    try {
      // const paymentSucces = await this.amqpConnection.request({
      //   exchange: configPublish.ROUTING_EXCHANGE_SUCCESS_PAYMENT,
      //   routingKey: configPublish.ROUTING_ROUTINGKEY_SUCCESS_PAYMENT,
      //   payload: {},
      //   correlationId: this.randomUUID,
      //   timeout: 30000,
      // })
      // this.logger.debug(paymentSucces)
    } catch (error) {
      this.logger.error('Error get one client coupon', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }

  async createNewView(createReview: CreateReview) {
    try {
      this.logger.verbose(
        `Message sent to: ${configPublish.ROUTING_EXCHANGE_CREATE_POST} `,
      )
      await this.amqpConnection.publish(
        configPublish.ROUTING_EXCHANGE_CREATE_POST,
        configPublish.ROUTING_ROUTINGKEY_CREATE_POST,
        createReview,
      )
    } catch (error) {
      this.logger.error('Error publish with create new view', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
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
        timeout: 30000,
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
      return await this.amqpConnection.request<FindOneClient>({
        exchange: configPublish.ROUTING_EXCHANGE_GET_ONE_CLIENT,
        routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ONE_CLIENT,
        payload: { userIdGoogle },
        correlationId: this.randomUUID,
        timeout: 30000,
      })
    } catch (error) {
      this.logger.error('Error get one client', error)
      throw ErrorHandlerService.handleError(error, ClientsService.name)
    }
  }
  async findOneVerify(userIdGoogle: string, verify: boolean) {
    try {
      return await this.amqpConnection.request<FindOneClient>({
        exchange: configPublish.ROUTING_ROUTINGKEY_GET_ONE_CLIENT_VERIFY,
        routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ONE_CLIENT_VERIFY,
        payload: { userIdGoogle, verify },
        correlationId: this.randomUUID,
        timeout: 30000,
      })
    } catch (error) {
      console.error({
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
        timeout: 30000,
        expiration: 30000,
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
