/**
 * * Nest Imports
 */
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

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

    nestFastifyApplication.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: false,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    );

    /** Set global prefix for all api route */
    nestFastifyApplication.setGlobalPrefix('/api/v1');

    /** Run server */
    await nestFastifyApplication.listen(3000, '0.0.0.0');
  }
}

/** Bootstrap application */
Server.bootstrap();
