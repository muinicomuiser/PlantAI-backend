import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Importa el archivo de configuración
import { InterceptorOkLogInterceptor } from './commons/interceptor/interceptor_ok_log.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/httpexception.filter';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new InterceptorOkLogInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  // Configuración de Swagger
  setupSwagger(app);

  // Configuración de puerto
  const port = app.get(ConfigService).get<number>('PORT');
  await app.listen(port);

  // Logger de inicio de la aplicación
  const logger = new Logger('Main Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);
}

bootstrap();
