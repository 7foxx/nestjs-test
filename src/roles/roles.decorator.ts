import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'

export const Roles = (...args: string[]) => SetMetadata('role', args)

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()

    return req.url
  },
)
