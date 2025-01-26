import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { InitApp } from './root/config.app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })
  await InitApp(app)
}

bootstrap()
