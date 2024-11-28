import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName'
import { AuthModule } from '../auth/auth.module'
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data'
import { ImagesService } from './services/image.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule,
    AuthModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),

    ClientsModule.register([
      {
        name: proxyName.name,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          // Establece el tiempo máximo para una solicitud de comando Redis antes de que se considere que ha fallado.
          commandTimeout: 5000,
          // Define el tiempo máximo para que el cliente de Redis se conecte al servidor.
          connectTimeout: 5000,
          // Establece el tiempo máximo para que el cliente de Redis se desconecte del servidor.
          // disconnectTimeout: 5000,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ImagesService],
})
export class ProductsModule {}
