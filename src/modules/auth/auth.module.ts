/**
 * * Packages Imports
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

/**
 * * Module imports
 */
import { UserModule } from '../user/user.module';

/**
 * * Local Imports
 */
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

/**
 * * Passport strategies
 */
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
