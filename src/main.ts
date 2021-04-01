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
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';

/**
 * * App Module Import
 */
import { AppModule } from './app.module';

class Server {
  static async bootstrap() {
    /** Create nest application instance */
    const nestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    const configService = await nestFastifyApplication.get(ConfigService);

    nestFastifyApplication.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: false,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    );

    /** Enable CORS */
    nestFastifyApplication.enableCors({
      origin: ['http://localhost:8080'],
      credentials: true,
    });

    /** Set global prefix for all api route */
    nestFastifyApplication.setGlobalPrefix('/api/v1');

    nestFastifyApplication.register(fastifyCookie, {
      secret: 'MY_SUPER_SECRET_COOKIE', // for cookies signature
    });

    console.log(configService.get('app').port);

    /** Run server */
    await nestFastifyApplication.listen(
      configService.get('app').port,
      '0.0.0.0',
    );
  }
}

/** Bootstrap application */
Server.bootstrap();
