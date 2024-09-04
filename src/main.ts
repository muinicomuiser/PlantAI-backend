import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InterceptorOkLogInterceptor } from './interceptor_ok_log/interceptor_ok_log.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InterceptorOkLogInterceptor());
  const config = new DocumentBuilder()
    .setTitle('API PlantAI')
    .setDescription('')
    .setVersion('1.0.0')
    .addTag('PlantAI-store-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  await app.listen(3000);
}
bootstrap();