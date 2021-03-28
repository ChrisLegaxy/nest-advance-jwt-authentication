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
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validateOrReject } from 'class-validator';

/**
 * * Dtos
 */
import { LoginBodyDto } from 'src/modules/auth/dto/auth.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const user = new LoginBodyDto();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user.username = request.body.username;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user.password = request.body.password;

    try {
      await validateOrReject(user);
    } catch (error) {
      throw new BadRequestException(
        error.flatMap((eachError) => Object.values(eachError.constraints)),
      );
    }

    return await super.canActivate(context);
  }
}
