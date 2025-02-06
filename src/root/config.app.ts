import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookie from 'cookie-parser'
import * as dotenv from 'dotenv'

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
})
export const InitApp = async (app: INestApplication<any>) => {
  app.use(cookie())

  app.useLogger(
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  )
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
    origin: true,
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
        `Server Api-Gateway listening  on port ${port} in mode ${process.env.NODE_ENV}`,
      )
    Logger.log(
      'Server Api-Gateway listening  on port',
      port,
      `NODE_ENV: ${process.env.NODE_ENV} `,
    )
  })
}
