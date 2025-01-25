import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as cookie from 'cookie-parser'
import { Logger, ValidationPipe } from '@nestjs/common'

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })
  app.use(cookie())

  const config = new DocumentBuilder()
    .setTitle('API-GATEWAY')
    .setDescription('API-GATEWAY')
    .setVersion('1.0')
    .addTag('API-GATEWAY')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-gateway', app, document)
  Logger.debug('Configuration CORS...')
  app.enableCors({
    credentials: true,
    origin: [
      'https://production.dctgtqj02tyd5.amplifyapp.com',
      'http://localhost:3000',
      '*',
    ],
    exposedHeaders: [
      'Set-Cookie',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
    ],
  })
  Logger.debug('Configuration CORS completed.')

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
    }),
  )

  await app.listen(port, () => {
    if (process.env.NODE_ENV === 'development')
      return Logger.verbose(
        `Server listening  on port ${port} in mode ${process.env.NODE_ENV}`,
      )
    Logger.log('listening on port:', port, `NODE_ENV: ${process.env.NODE_ENV} `)
  })
}

bootstrap()
