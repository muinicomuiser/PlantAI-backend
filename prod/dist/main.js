'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const interceptor_ok_log_interceptor_1 = require('./commons/interceptor/interceptor_ok_log.interceptor');
const common_1 = require('@nestjs/common');
const swagger_1 = require('@nestjs/swagger');
const httpexception_filter_1 = require('./commons/filter/httpexception.filter');
const config_1 = require('@nestjs/config');
const carro_compras_module_1 = require('./carro-compras/carro-compras.module');
const catalogo_module_1 = require('./catalogo/catalogo.module');
const pedidos_module_1 = require('./pedidos/pedidos.module');
const productos_module_1 = require('./productos/productos.module');
const usuarios_module_1 = require('./usuarios/usuarios.module');
const equipo_module_1 = require('./commons/modelse3/equipo/equipo.module');
const auth_module_1 = require('./auth/auth.module');
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  app.useGlobalInterceptors(
    new interceptor_ok_log_interceptor_1.InterceptorOkLogInterceptor(),
  );
  app.useGlobalPipes(
    new common_1.ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new httpexception_filter_1.HttpExceptionFilter());
  app.enableCors();
  const configService = app.get(config_1.ConfigService);
  const port = configService.get('PORT');
  console.log('PUERTO: ', port);
  const name = configService.get('npm_package_name');
  const description = configService.get('npm_package_description');
  const version = configService.get('npm_package_version');
  const authorName = configService.get('npm_package_author_name');
  const authorUrl = configService.get('npm_package_author_url');
  const authorEmail = configService.get('npm_package_author_email');
  const license = configService.get('npm_package_license');
  const ambiente = configService.get('AMBIENTE');
  console.log(ambiente);
  const config = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(
      description +
        '\n \nLas documentaciones de cada módulo están disponibles en las rutas siguientes: \n\n Módulo Carro de compras: api/carro\n' +
        '\n Módulo Catálogo: api/catalogo\n' +
        '\n Módulo Pedidos: api/pedidos\n' +
        '\n Módulo Productos: api/productos\n' +
        '\n Módulo Usuarios: api/usuarios\n' +
        '\n Módulo Equipo: api/equipo\n' +
        '\n Módulo Autenticación: api/aut',
    )
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .build();
  const configCarro = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Carro de compras')
    .build();
  const configCatalogo = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Catálogo')
    .build();
  const configPedidos = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Pedidos')
    .build();
  const configProductos = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Productos')
    .build();
  const configUsuarios = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Usuarios')
    .build();
  const configEquipo = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Equipo')
    .build();
  const configAut = new swagger_1.DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(description)
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addTag('Autenticación')
    .build();
  const document = swagger_1.SwaggerModule.createDocument(app, config, {
    include: [app_module_1.AppModule],
  });
  const documentCarro = swagger_1.SwaggerModule.createDocument(
    app,
    configCarro,
    {
      include: [carro_compras_module_1.CarroComprasModule],
    },
  );
  const documentCatalogo = swagger_1.SwaggerModule.createDocument(
    app,
    configCatalogo,
    {
      include: [catalogo_module_1.CatalogoModule],
    },
  );
  const documentPedidos = swagger_1.SwaggerModule.createDocument(
    app,
    configPedidos,
    {
      include: [pedidos_module_1.PedidosModule],
    },
  );
  const documentProductos = swagger_1.SwaggerModule.createDocument(
    app,
    configProductos,
    {
      include: [productos_module_1.ProductosModule],
    },
  );
  const documentUsuarios = swagger_1.SwaggerModule.createDocument(
    app,
    configUsuarios,
    {
      include: [usuarios_module_1.UsuariosModule],
    },
  );
  const documentEquipo = swagger_1.SwaggerModule.createDocument(
    app,
    configEquipo,
    {
      include: [equipo_module_1.EquipoModule],
    },
  );
  const documentAut = swagger_1.SwaggerModule.createDocument(app, configAut, {
    include: [auth_module_1.AuthModule],
  });
  swagger_1.SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/carro', app, documentCarro, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/catalogo', app, documentCatalogo, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/pedidos', app, documentPedidos, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/productos', app, documentProductos, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/usuarios', app, documentUsuarios, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/equipo', app, documentEquipo, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  swagger_1.SwaggerModule.setup('api/aut', app, documentAut, {
    yamlDocumentUrl: 'swagger/yaml',
  });
  await app.listen(port);
  const logger = new common_1.Logger('Main Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
