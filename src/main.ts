import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Cotiledón')
    .setDescription('')
    .setVersion('1.0.0')
    .addTag('cotiledon-store-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  await app.listen(3000);
}
bootstrap();