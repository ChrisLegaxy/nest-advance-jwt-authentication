/**
 * * Packages Imports
 */
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
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

  @Post('/register')
  public async register(@Body() registerBodyDto: RegisterBodyDto) {
    return await this.authService.register(registerBodyDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@AuthUser() user: User, @Res() response: FastifyReply) {
    setRefreshTokenToHttpOnlyCookie(
      response,
      await this.authService.signJwtRefreshToken(user),
    );

    return await response.send(
      plainToClass(AuthResponseDto, await this.authService.login(user)),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current_user')
  public get(@AuthUser() user: User) {
    return plainToClass(UserResponseDto, user);
  }

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
      plainToClass(AuthResponseDto, await this.authService.login(user)),
    );
  }
}
