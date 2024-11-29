import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { CouponModule } from './modules/coupon/coupon.module'
import { ProductsModule } from './modules/products/products.module'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
// import { AuthMiddleware } from './middleware/auth.middleware'

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    ProductsModule,
    CategoryModule,
    CouponModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude(
  //       {
  //         path: 'auth/login',
  //         method: RequestMethod.POST,
  //       },
  //       {
  //         method: RequestMethod.GET,
  //         path: 'auth/verify-token/:token',
  //       },
  //       {
  //         path: 'user',
  //         method: RequestMethod.POST,
  //       },
  //       {
  //         path: 'role',
  //         method: RequestMethod.POST,
  //       },
  //     )
  //     .forRoutes('*')
  // }
}
