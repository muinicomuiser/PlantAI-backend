import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InterceptorOkLogInterceptor } from './commons/interceptor/interceptor_ok_log.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './commons/filter/httpexception.filter';
import { ConfigService } from '@nestjs/config';
import { CarroComprasModule } from './carro-compras/carro-compras.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EquipoModule } from './commons/modelse3/equipo/equipo.module';
import { AuthModule } from './auth/auth.module';

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
  const license = configService.get('npm_package_license');
  const ambiente = configService.get('AMBIENTE');
  console.log(ambiente);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description
      + '\n \nLas documentaciones de cada módulo están disponibles en las rutas siguientes: \n\n Módulo Carro de compras: api/carro\n'
      + '\n Módulo Catálogo: api/catalogo\n'
      + '\n Módulo Pedidos: api/pedidos\n'
      + '\n Módulo Productos: api/productos\n'
      + '\n Módulo Usuarios: api/usuarios\n'
      + '\n Módulo Equipo: api/equipo\n'
      + '\n Módulo Autenticación: api/aut')

    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .build();
  const configCarro = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Carro de compras')
    .build();
  const configCatalogo = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Catálogo')
    .build();
  const configPedidos = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Pedidos')
    .build();
  const configProductos = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Productos')
    .build();
  const configUsuarios = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Usuarios')
    .build();
  const configEquipo = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Equipo')
    .build();
  const configAut = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Autenticación')
    .build();

  //Swagger setup
  const document = SwaggerModule.createDocument(app, config, { include: [AppModule] });
  const documentCarro = SwaggerModule.createDocument(app, configCarro, { include: [CarroComprasModule] });
  const documentCatalogo = SwaggerModule.createDocument(app, configCatalogo, { include: [CatalogoModule] });
  const documentPedidos = SwaggerModule.createDocument(app, configPedidos, { include: [PedidosModule] });
  const documentProductos = SwaggerModule.createDocument(app, configProductos, { include: [ProductosModule] });
  const documentUsuarios = SwaggerModule.createDocument(app, configUsuarios, { include: [UsuariosModule] });
  const documentEquipo = SwaggerModule.createDocument(app, configEquipo, { include: [EquipoModule] });
  const documentAut = SwaggerModule.createDocument(app, configAut, { include: [AuthModule] });

  SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/carro', app, documentCarro, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/catalogo', app, documentCatalogo, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/pedidos', app, documentPedidos, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/productos', app, documentProductos, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/usuarios', app, documentUsuarios, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/equipo', app, documentEquipo, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  SwaggerModule.setup('api/aut', app, documentAut, {
    yamlDocumentUrl: 'swagger/yaml',
  });

  //logger port
  const logger = new Logger('Main Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);

  // Start the app on port 3000
  await app.listen(port);
}
bootstrap();
