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

  // habilitar cors de manera global
  app.enableCors();

  // Get the port from the ConfigService
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  console.log('PUERTO: ', port);

  //Get information of package.json
  const name = configService.get("npm_package_name");
  const description = configService.get("npm_package_description");
  const version = configService.get("npm_package_version");
  const authorName = configService.get("npm_package_author_name");
  const authorUrl = configService.get("npm_package_author_url")
  const authorEmail = configService.get("npm_package_author_email");
  const license = configService.get("npm_package_license");
  const ambiente = configService.get('AMBIENTE');
  console.log(ambiente);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Carro de compras')
    .addTag('Catálogo')
    .addTag('Pedidos')
    .addTag('Productos')
    .addTag('Usuarios')
    .addTag('Equipo')
    .addTag('Autenticación')
    .build();

  // Swagger setup
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });

  //logger port
  const logger = new Logger('Main Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);

  // Start the app on port 3000
  await app.listen(port);
}
bootstrap();
