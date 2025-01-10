import { Module } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { ClientsController } from './clients.controller'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { configExchange, configQueue } from './common/config-rabbitMQ'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('RABBITMQ_URL'),
        exchanges: configExchange,
        queues: configQueue,
        // connectionInitOptions: {
        //   wait: false,
        // },
        // channels: {
        //   default: {
        //     // El prefetchCount en RabbitMQ controla la cantidad de mensajes que un consumidor puede recibir y procesar simultáneamente antes de enviar un ack (confirmación) de los mensajes procesados. Esto forma parte del mecanismo de QoS (Quality of Service) en RabbitMQ.
        //     prefetchCount: 10,
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
