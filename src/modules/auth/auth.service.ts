import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginBodyDto, RegisterBodyDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async register(registerBodyDto: RegisterBodyDto) {
    await this.userService.create(registerBodyDto);
  }

  public async login(user: User) {
    return {
      user: plainToClass(UserResponseDto, user),
      accessToken: await this.signJwtAccessToken(user),
    };
  }

  public async validateUser(loginBodyDto: LoginBodyDto): Promise<User> {
    try {
      const user: User = await this.userService.findByUsernameOrFail(
        loginBodyDto.username,
      );

      await User.comparePassword(loginBodyDto.password, user);

      return user;
    } catch (error) {
      throw new UnauthorizedException('Incorrect Username or Password');
    }
  }

  public async signJwtAccessToken(user: User) {
    try {
      return await this.jwtService.signAsync(
        {
          id: user.id,
          sub: user.username,
        },
        {
          expiresIn: '60s',
          algorithm: 'HS512',
          issuer: 'Nest Advance JWT Authentication',
          audience: 'Authenicated Users',
        },
      );
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }

  public async signJwtRefreshToken(user: User) {
    try {
      return await this.jwtService.signAsync(
        {
          id: user.id,
          sub: user.username,
        },
        {
          secret: 'MY_REFRESH_TOKEN_SUPER_SECRET_KEY',
          expiresIn: '7d',
          algorithm: 'HS512',
          issuer: 'Nest Advance JWT Authentication',
          audience: 'Authenicated Users',
        },
      );
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }
}
