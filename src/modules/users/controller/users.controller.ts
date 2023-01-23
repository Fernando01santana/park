import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDto } from '../dto/createUser.dto';
import { updateUser } from '../dto/updatedUser.dto';
import { Users } from '../entites/user.entity';
import { UserService } from '../services/users.service';
@Controller('user')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() data: createUserDto): Promise<Users> {
    return await this.userService.create(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: updateUser,
  ): Promise<Users> {
    return this.userService.update(id, data);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('/list')
  async list(): Promise<Users[]> {
    return this.userService.list();
  }
}
