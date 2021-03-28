/**
 * * Packages Imports
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * * All Module Imports
 */
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

/**
 * * Local Imports
 */
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'advance_auth',
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
