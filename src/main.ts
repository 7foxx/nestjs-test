import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import { Request, Response, NextFunction } from 'express'
import * as cors from 'cors'

const MiddlewareConfig = (req: Request, res: Response, next: NextFunction) => {
  // console.log('在全局被拦截', res)
  // next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
  await app.listen(3000)
}
bootstrap()
