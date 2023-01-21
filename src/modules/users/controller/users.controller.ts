import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/users.service';
import {createUserDto} from '../dto/createUser.dto'
import { Users } from '../entites/user.entity';
import { updateUser } from '../dto/updatedUser.dto';
import { request } from 'http';
@Controller('user')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() data:createUserDto): Promise<Users> {
    return this.userService.create(data)
  }

  @Put('/update/:id')
  async update(@Param('id') id:string,@Body() data:updateUser):Promise<Users>{
    return this.userService.update(id,data)
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id:string):Promise<void>{
    return this.userService.remove(id)
  }

  @Get('/list')
  async list():Promise<Users[]>{
    return this.userService.list()
  }
}
