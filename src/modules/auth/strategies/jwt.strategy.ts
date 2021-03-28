import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';
import { DecodedToken } from 'src/utils/jwt.util';
import { User } from 'src/modules/user/user.entity';

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
