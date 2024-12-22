import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InterceptorOkLogInterceptor } from './commons/interceptor/interceptor_ok_log.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/httpexception.filter';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger/swagger.config';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './config/winston/winston.config';
import { LoggingInterceptor } from './commons/interceptor/logger.interceptor';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(
    // new InterceptorOkLogInterceptor(),
    new LoggingInterceptor(winstonLogger),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(json({ limit: '2mb' }));

  // Configuración de Swagger
  setupSwagger(app);

  // Configuración de puerto
  const port = app.get(ConfigService).get<number>('PORT');
  console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET')); // Esto debe imprimir tu clave secreta

  await app.listen(port);

  // Logger de inicio de la aplicación
  const logger = new Logger('Main Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);
}

bootstrap();
