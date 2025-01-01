import { Module } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { ClientsController } from './clients.controller'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { configExchange, configQueue } from './common/config-rabbitMQ'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://guest:guest@localhost:5672', // Usuario, contraseña y puerto
      queues: configQueue,
      exchanges: configExchange,
    }),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
