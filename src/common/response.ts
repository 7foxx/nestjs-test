import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

import { Request, Response } from 'express'

interface SuccessData<T> {
  data: T
}

// 响应成功拦截器
@Injectable()
export class ResponseSuccess<T = any> implements NestInterceptor {
  intercept(context, nest: CallHandler): Observable<SuccessData<T>> {
    return nest.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          success: true,
          message: '成功',
        }
      }),
    )
  }
}

// 异常拦截器
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const status = exception.getStatus()

    response.status(status).json({
      data: exception.message,
      time: new Date().getTime(),
      success: false,
      path: request.url,
      status,
    })
  }
}
