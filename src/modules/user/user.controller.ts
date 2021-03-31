/**
 * @version 1.0.0
 * @license MIT
 * @copyright CPC
 * @author Chris Legaxy | Chris Van
 * @contact chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
 */

/**
 * * Packages Imports
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

/**
 * * Local Imports
 */
import { UserService } from './user.service';

/**
 * * Guards
 */
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

/**
 * * Dtos
 */
import {
  UserCreateBodyDto,
  UserResponseDto,
  UserUpdateBodyDto,
} from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUsers() {
    return await this.userService.find();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return plainToClass(
      UserResponseDto,
      await this.userService.findByIdOrFail(id),
    );
  }

  /**
   * ! Disabled as we only need registration for now
   */
  // @HttpCode(HttpStatus.CREATED)
  // @Post()
  public async createUser(@Body() createBodyDto: UserCreateBodyDto) {
    return plainToClass(
      UserResponseDto,
      await this.userService.create(createBodyDto),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBodyDto: UserUpdateBodyDto,
  ) {
    return plainToClass(
      UserResponseDto,
      await this.userService.update(id, updateBodyDto),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.delete(id);
  }
}
