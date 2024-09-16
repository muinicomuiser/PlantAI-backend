import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InterceptorOkLogInterceptor } from './commons/interceptor/interceptor_ok_log.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './commons/filter/httpexception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule);

  // Add the interceptor to the app
  app.useGlobalInterceptors(new InterceptorOkLogInterceptor());

  // Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );
  // add exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('API PlantAI')
    .setDescription('')
    .setVersion('1.0.0')
    .addTag('PlantAI-store-api')
    .build();

  // Swagger setup
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });

  // habilitar cors de manera global
  app.enableCors();

  // Get the port from the ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  //logger port
  const logger = new Logger('Main Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);

  // Start the app on port 3000
  await app.listen(port);
}
bootstrap();
