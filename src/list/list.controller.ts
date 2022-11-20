import { Controller, Get, Inject } from '@nestjs/common';
import { ListService } from './list.service';
import { UserService } from 'src/user/user.service';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject('Users') private readonly userService: UserService,
  ) {}
  @Get('user')
  findAll() {
    return this.userService.findAll();
  }
}
