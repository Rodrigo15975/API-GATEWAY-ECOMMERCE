import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
// import { HttpExceptionFilter } from './common/catch.exception.filter'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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

  // forma de usar el exceptio filter de manera global
  // tambien lo puedes usar en el controller solitario
  // mejor es usarlo solitario poir que afecta el error
  // app.useGlobalFilters(new HttpExceptionFilter())

  const port = Number(process.env.API_GATEWAY_SERVICE_PORT) || 4000
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // errorHttpStatusCode: 400,
      // transformOptions: { enableImplicitConversion: true },
      // disableErrorMessages: false,
      // validationError: { target: false },
      // stopAtFirstError: true,
    }),
  )

  await app.listen(port, () => {
    console.log('listening on port ' + port)
  })
}
bootstrap()
