import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { CouponModule } from './modules/coupon/coupon.module'
import { ProductsModule } from './modules/products/products.module'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
import { AuthMiddleware } from './middleware/auth.middleware'
import { CronJobModule } from './modules/cron-job/cron-job.module'
import { ClientsModule } from './modules/clients/clients.module'

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    ProductsModule,
    CategoryModule,
    CouponModule,
    CronJobModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        },
        {
          method: RequestMethod.GET,
          path: 'auth/verify-token/:token',
        },
        {
          path: 'user',
          method: RequestMethod.POST,
        },
        {
          path: 'role',
          method: RequestMethod.POST,
        },
        {
          path: 'clients(.*)',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*')
  }
}
