import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import { Request, Response, NextFunction } from 'express'
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { HttpFilter, ResponseSuccess } from './common/response'
import { ValidationPipe } from '@nestjs/common'
import { UserGuard } from './user/user.guard'

const MiddlewareConfig = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req
  console.log('在全局被拦截', body)
  next()
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 跨域
  app.use(cors())
  // 全局中间件
  app.use(MiddlewareConfig)
  // 验证码插件注册
  app.use(
    session({
      secret: 'Fox',
      name: 'fox.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  )
  // 上传图片后生成访问路径
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/imgesall',
  })

  // 响应拦截器
  app.useGlobalInterceptors(new ResponseSuccess())

  // 异常拦截器
  // app.useGlobalFilters(new HttpFilter())

  // 全局管道验证DTO
  app.useGlobalPipes(new ValidationPipe())

  // 注册全局守卫
  // app.useGlobalGuards(new UserGuard())

  await app.listen(3000)
}
bootstrap()
