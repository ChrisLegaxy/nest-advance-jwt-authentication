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
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * * User Module Imports
 */
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

/**
 * * Utils
 */
import { DecodedToken } from 'src/utils/jwt.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'access-token-jwt',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MY_SUPER_SECRET_KEY',
    });
  }

  async validate({ id }: DecodedToken): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid User! User may has been deleted from the system. Please contact customer support.',
      );
    }

    return user;
  }
}
