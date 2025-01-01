import {
  RabbitMQExchangeConfig,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq'

// Direct: Cuando tienes un routingKey específico para cada cola.
// Fanout: Cuando quieres enviar mensajes a todas las colas sin preocuparte por el routingKey.
// Topic: Cuando necesitas más flexibilidad para enrutamiento basado en categorías o jerarquías.
// Headers: Cuando el enrutamiento depende de múltiples propiedades o valores en los encabezados.

export const configPublish = {
  ROUTING_EXCHANGE_CREATE_COUPON: 'client.create.coupon',
  ROUTING_ROUTINGKEY_CREATE_COUPON: 'client.create.coupon',
}

export const configQueue: RabbitMQQueueConfig[] = [
  {
    name: 'client.create.coupon',
    routingKey: 'client.create.coupon',
    exchange: 'client.create.coupon',
  },
]

export const configExchange: RabbitMQExchangeConfig[] = [
  {
    name: 'client.create.coupon',
    type: 'direct',
  },
]
