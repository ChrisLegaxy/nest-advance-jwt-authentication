import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserCreateBodyDto, UserResponseDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUsers() {
    return await this.userService.find();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUser(@Body() createBodyDto: UserCreateBodyDto) {
    return plainToClass(
      UserResponseDto,
      await this.userService.create(createBodyDto),
    );
  }
}
