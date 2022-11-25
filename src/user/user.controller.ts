import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
  Session,
  Inject,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import * as svgCaptcha from 'svg-captcha'
import { UserPipe } from './user.pipe'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(
    @Inject('Users') private readonly userService: UserService,
    @Inject('FoxTest') private readonly Test: string[],
    @Inject('gongchang') private readonly gongchang: any,
  ) {}

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 150, //宽度
      height: 50, //高度
      background: '#cc9966', //背景颜色
    })
    req.session.code = captcha.text //存储验证码记录到session
    res.type('image/svg+xml')
    res.send(captcha.data)
  }

  @Post('submit')
  submitUser(@Body() res, @Session() session) {
    if (session.code.toLocaleLowerCase() === res?.code?.toLocaleLowerCase()) {
      return {
        code: 200,
        status: 'success',
      }
    } else {
      return {
        code: 400,
        status: 'error',
      }
    }
  }

  @Get('query')
  findAll(@Query() query) {
    console.log(query)
    return this.userService.findAll() + this.gongchang
  }

  @Post('body')
  findPost(@Body() body: CreateUserDto) {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    console.log(typeof id, '===============')

    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
