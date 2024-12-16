import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseDTO } from 'src/utils/types/route-response.type';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOrFail(id);
  }

  @Post('/')
  async create(@Body() user: CreateUserDto): Promise<ResponseDTO<User>> {
    const createdUser = await this.usersService.create(user);
    return {
      message: 'User created',
      data: createdUser,
    };
  }
}
