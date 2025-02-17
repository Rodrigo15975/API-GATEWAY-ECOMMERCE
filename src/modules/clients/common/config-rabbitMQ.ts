import {
  RabbitMQExchangeConfig,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq'

// Direct: Cuando tienes un routingKey específico para cada cola.
// Fanout: Cuando quieres enviar mensajes a todas las colas sin preocuparte por el routingKey.
// Topic: Cuando necesitas más flexibilidad para enrutamiento basado en categorías o jerarquías.
// Headers: Cuando el enrutamiento depende de múltiples propiedades o valores en los encabezados.

export const configPublish = {
  ROUTING_EXCHANGE_VERIFY_COUPON_COUDE: 'client.verify.code.discount',
  ROUTING_ROUTINGKEY_VERIFY_COUPON_COUDE: 'client.verify.code.discount',

  ROUTING_EXCHANGE_CREATE_COUPON: 'client.create.coupon',
  ROUTING_ROUTINGKEY_CREATE_COUPON: 'client.create.coupon',

  ROUTING_EXCHANGE_GET_ALL_ORDERS_CLIENT_ID: 'client.get.all.orders.client.id',
  ROUTING_ROUTINGKEY_GET_ALL_ORDERS_CLIENT_ID:
    'client.get.all.orders.client.id',
  ROUTING_QUEUE_GET_ALL_ORDERS_CLIENT_ID: 'client.get.all.orders.client.id',

  ROUTING_EXCHANGE_UPDATE_EXPIRY_DATE_COUPON:
    'client.update.expiry.date.coupon',
  ROUTING_ROUTINGKEY_UPDATE_EXPIRY_DATE_COUPON:
    'client.update.expiry.date.coupon',

  ROUTING_EXCHANGE_GET_ALL_CLIENTS: 'client.get.all.clients',
  ROUTING_ROUTINGKEY_GET_ALL_CLIENTS: 'client.get.all.clients',

  ROUTING_EXCHANGE_GET_ONE_CLIENT: 'client.get.one.client',
  ROUTING_ROUTINGKEY_GET_ONE_CLIENT: 'client.get.one.client',

  ROUTING_EXCHANGE_GET_ONE_CLIENT_VERIFY: 'client.get.one.client.verify',
  ROUTING_ROUTINGKEY_GET_ONE_CLIENT_VERIFY: 'client.get.one.client.verify',

  ROUTING_EXCHANGE_CREATE_POST: 'client.create.post',
  ROUTING_ROUTINGKEY_CREATE_POST: 'client.create.post',
}

// Siempre configurar esto si no te sale error internal server
//  para el module IMPORTANTE
export const configQueue: RabbitMQQueueConfig[] = [
  {
    name: configPublish.ROUTING_QUEUE_GET_ALL_ORDERS_CLIENT_ID,
    routingKey: configPublish.ROUTING_ROUTINGKEY_GET_ALL_ORDERS_CLIENT_ID,
    exchange: configPublish.ROUTING_EXCHANGE_GET_ALL_ORDERS_CLIENT_ID,
    options: {
      durable: true,
      // expires: 60000,
    },
  },
  {
    name: 'client.verify.code.discount',
    routingKey: 'client.verify.code.discount',
    exchange: 'client.verify.code.discount',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.create.coupon',
    routingKey: 'client.create.coupon',
    exchange: 'client.create.coupon',
    options: {
      persistent: true,
    },
  },
  {
    name: 'client.create.post',
    routingKey: 'client.create.post',
    exchange: 'client.create.post',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.get.one.client.verify',
    routingKey: 'client.get.one.client.verify',
    exchange: 'client.get.one.client.verify',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.update.expiry.date.coupon',
    routingKey: 'client.update.expiry.date.coupon',
    exchange: 'client.update.expiry.date.coupon',
    options: {
      persistent: true,
    },
  },
  {
    name: 'client.get.all.clients',
    routingKey: 'client.get.all.clients',
    exchange: 'client.get.all.clients',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.get.one.client',
    routingKey: 'client.get.one.client',
    exchange: 'client.get.one.client',
    options: {
      persistent: true,
    },
  },
]

export const configExchange: RabbitMQExchangeConfig[] = [
  {
    name: configPublish.ROUTING_EXCHANGE_GET_ALL_ORDERS_CLIENT_ID,
    type: 'direct',
    options: {
      durable: true,
    },
  },
  {
    name: 'client.verify.code.discount',
    type: 'direct',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.create.coupon',
    type: 'direct',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.create.post',
    type: 'direct',
    options: {
      persistent: true,
    },
  },

  {
    name: 'client.update.expiry.date.coupon',
    type: 'direct',
    options: {
      persistent: true,
    },
  },
  {
    name: 'client.get.all.clients',
    type: 'direct',
    options: {
      persistent: true,
    },
  },
  {
    name: 'client.get.one.client',
    type: 'direct',
    options: {
      persistent: true,
    },
  },
  {
    name: 'client.get.one.client.verify',
    type: 'direct',
    options: {
      persistent: true,
    },
  },
]
