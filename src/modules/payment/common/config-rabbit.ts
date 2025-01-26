import {
  RabbitMQExchangeConfig,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq'

export const configRabbit = {
  ROUTING_EXCHANGE_CREATE_PAYMENT: 'payment.create.payment',
  ROUTING_ROUTINGKEY_CREATE_PAYMENT: 'payment.create.payment',
  ROUTING_QUEUE_CREATE_PAYMENT: 'payment.create.payment',
}
export const configQueue: RabbitMQQueueConfig[] = [
  {
    name: configRabbit.ROUTING_QUEUE_CREATE_PAYMENT,
    routingKey: configRabbit.ROUTING_ROUTINGKEY_CREATE_PAYMENT,
    exchange: configRabbit.ROUTING_EXCHANGE_CREATE_PAYMENT,
    options: {
      durable: true,
    },
  },
]
export const configExchange: RabbitMQExchangeConfig[] = [
  {
    name: configRabbit.ROUTING_EXCHANGE_CREATE_PAYMENT,
    type: 'direct',
    options: {
      durable: true,
    },
  },
]
