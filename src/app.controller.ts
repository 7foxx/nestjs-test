import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { UserService } from './user/user.service'

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('Users') private readonly userService: UserService,
    @Inject('Config') private readonly Config: any,
  ) {}

  @Get('index')
  getHello(): string {
    return this.userService.findAll()
  }

  @Get('glo')
  getGlobal() {
    return this.Config
  }
}
