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
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * * Local Imports
 */
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

/**
 * * Dtos
 */
import { LoginBodyDto, RegisterBodyDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async register(registerBodyDto: RegisterBodyDto): Promise<User> {
    return await this.userService.create(registerBodyDto);
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

  public async signJwtAccessToken(user: User): Promise<string> {
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

  public async signJwtRefreshToken(user: User): Promise<string> {
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
