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
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FastifyReply } from 'fastify';

/**
 * * App Module imports
 */
import { User } from '../user/user.entity';

/**
 * * Local Module Imports
 */
import { AuthService } from './auth.service';

/**
 * * Route Guards
 */
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { RefreshTokenJwtAuthGuard } from 'src/guards/refresh-token-jwt.guard';

/**
 * * Decorators
 */
import { AuthUser } from 'src/decorators/auth-user.decorator';

/**
 * * Utils
 */
import { setRefreshTokenToHttpOnlyCookie } from 'src/utils/response.util';

/**
 * * Dtos
 */
import { UserResponseDto } from '../user/dto/user.dto';
import { AuthResponseDto, RegisterBodyDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  public async register(
    @Body() registerBodyDto: RegisterBodyDto,
    @Res() response: FastifyReply,
  ) {
    const user = await this.authService.register(registerBodyDto);

    setRefreshTokenToHttpOnlyCookie(
      response,
      await this.authService.signJwtRefreshToken(user),
    );

    return await response.send(
      plainToClass(AuthResponseDto, {
        user: plainToClass(UserResponseDto, user),
        accessToken: await this.authService.signJwtAccessToken(user),
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@AuthUser() user: User, @Res() response: FastifyReply) {
    setRefreshTokenToHttpOnlyCookie(
      response,
      await this.authService.signJwtRefreshToken(user),
    );

    return await response.send(
      plainToClass(AuthResponseDto, {
        user: plainToClass(UserResponseDto, user),
        accessToken: await this.authService.signJwtAccessToken(user),
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  public get(@AuthUser() user: User) {
    return plainToClass(UserResponseDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenJwtAuthGuard)
  @Get('/refresh_token')
  public async refreshToken(
    @AuthUser() user: User,
    @Res() response: FastifyReply,
  ) {
    setRefreshTokenToHttpOnlyCookie(
      response,
      await this.authService.signJwtRefreshToken(user),
    );

    return await response.send(
      plainToClass(AuthResponseDto, {
        user: plainToClass(UserResponseDto, user),
        accessToken: await this.authService.signJwtAccessToken(user),
      }),
    );
  }
}
