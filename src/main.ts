import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as cookie from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  dotenv.config({
    path:
      process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development',
  })

  const app = await NestFactory.create(AppModule)
  app.use(cookie())

  const config = new DocumentBuilder()
    .setTitle('API-GATEWAY')
    .setDescription('API-GATEWAY')
    .setVersion('1.0')
    .addTag('API-GATEWAY')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-gateway', app, document)
  app.enableCors({
    credentials: true,
    // origin: true,
    origin: [
      'http://192.168.1.29:3000',
      'https://master.dk87wm75w1xvx.amplifyapp.com',
      'https://master.d2l2oxroeqqeuk.amplifyapp.com',
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
    console.log('listening on port ' + port)
  })
}
bootstrap()
