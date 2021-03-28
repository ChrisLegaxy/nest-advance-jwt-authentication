import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validateOrReject } from 'class-validator';
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
