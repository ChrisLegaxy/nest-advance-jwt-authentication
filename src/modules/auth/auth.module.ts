import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/login.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenJwtStrategy } from './strategies/refresh-token-jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'MY_SUPER_SECRET_KEY',
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
