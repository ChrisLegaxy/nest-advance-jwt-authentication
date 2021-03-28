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
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * * User Module Imports
 */
import { User } from 'src/modules/user/user.entity';

/**
 * * Local Imports
 */
import { AuthService } from '../auth.service';

/**
 * * Dtos
 */
import { LoginBodyDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
      username,
      password,
    } as LoginBodyDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
