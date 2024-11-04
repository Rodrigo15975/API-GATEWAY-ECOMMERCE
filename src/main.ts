import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('API-GATEWAY')
    .setDescription('API-GATEWAY')
    .setVersion('1.0')
    .addTag('API-GATEWAY')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-gateway', app, document)
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
  // app.useGlobalFilters(new RpcExceptionFilter())

  await app.listen(4000)
}
bootstrap()
