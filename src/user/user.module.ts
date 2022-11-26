import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TestController } from '../test/test.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
// import { MiddlewareMiddleware } from 'src/middleware/middleware.middleware'

const UserProviders: Provider[] = [
  {
    provide: 'Users',
    useClass: UserService,
  },
  {
    provide: 'FoxTest',
    useValue: ['add', 'rem'],
  },
  TestController,
  {
    provide: 'gongchang',
    inject: [TestController], // 通过 inject 将其他类注入到当前提供者中，在useFactory中对应的参数就是注入类的顺序
    async useFactory(TestController: TestController) {
      return await new Promise((r) => {
        setTimeout(() => {
          console.log(TestController, 'gongchang')
          r('success')
        }, 2000)
      })
    },
  },
]

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [...UserProviders],
  exports: [...UserProviders],
})
export class UserModule {}
// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     // 局部注入拦截 user 路由
//     consumer.apply(MiddlewareMiddleware).forRoutes('user')
//   }
// }
