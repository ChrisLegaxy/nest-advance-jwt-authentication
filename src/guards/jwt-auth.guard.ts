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
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('access-token-jwt') {
  handleRequest(err, user, info) {
    if (err) {
      throw new UnauthorizedException(err.message);
    }

    if (info || !user) {
      throw new UnauthorizedException(info.message);
    }

    return user;
  }
}
