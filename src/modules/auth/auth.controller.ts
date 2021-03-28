import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { RefreshTokenJwtAuthGuard } from 'src/guards/refresh-token-jwt.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthResponseDto, RegisterBodyDto } from './dto/auth.dto';
import { User } from '../user/user.entity';
import { UserResponseDto } from '../user/dto/user.dto';
import { setRefreshTokenToHttpOnlyCookie } from 'src/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/register')
  public async register(@Body() registerBodyDto: RegisterBodyDto) {
    return await this.authService.register(registerBodyDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
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
