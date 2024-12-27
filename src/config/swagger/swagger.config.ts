import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CarroComprasModule } from 'src/carro-compras/carro-compras.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { ProductosModule } from 'src/productos/productos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { EquipoModule } from 'src/commons/modelse3/equipo/equipo.module';
import { AuthModule } from 'src/auth/auth.module';
import { IaconsultasModule } from 'src/iaconsultas/iaconsultas.module';
import { ReviewsModule } from 'src/reviews/reviews.module';

export function setupSwagger(app: INestApplication) {
  const configService: ConfigService = app.get(ConfigService);

  const name = configService.get('npm_package_name');
  const description = configService.get('npm_package_description');
  const version = configService.get('npm_package_version');
  const authorName = configService.get('npm_package_author_name');
  const authorUrl = configService.get('npm_package_author_url');
  const authorEmail = configService.get('npm_package_author_email');
  const license = configService.get('npm_package_license');
  const ambiente = configService.get('AMBIENTE');

  //configuracion global de swagger
  const globalConfig = new DocumentBuilder()
    .setTitle(`${name} - ${ambiente}`)
    .setDescription(
      description +

      '\n \nLa documentación de cada módulo está disponible en las rutas siguientes: \n\n Módulo Carro de compras: api/carro\n' +
      '\n Módulo Pedidos: api/pedidos\n' +
      '\n Módulo Productos: api/productos\n' +
      '\n Módulo Usuarios: api/usuarios\n' +
      '\n Módulo Equipo: api/equipo\n' +
      '\n Módulo Autenticación: api/aut\n' +
      '\n Módulo Consultas IA: api/iaconsultas\n' +
      '\n Módulo Reviews: api/reviews',
    )
    .setVersion(version)
    .setContact(authorName, authorUrl, authorEmail)
    .setLicense(license, '')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const golbalDocument = SwaggerModule.createDocument(app, globalConfig);
  SwaggerModule.setup('api', app, golbalDocument, {
    yamlDocumentUrl: 'swagger/yaml',
  });

  // Configuraciones de modulos
  const configs = [
    { module: CarroComprasModule, path: 'api/carro' },
    { module: PedidosModule, path: 'api/pedidos' },
    { module: ProductosModule, path: 'api/productos' },
    { module: UsuariosModule, path: 'api/usuarios' },
    { module: EquipoModule, path: 'api/equipo' },
    { module: AuthModule, path: 'api/aut' },
    { module: IaconsultasModule, path: 'api/iaconsultas' },
    { module: ReviewsModule, path: 'api/reviews' },
  ];

  configs.forEach(({ module, path }) => {
    const modConfig = new DocumentBuilder()
      .setTitle(`${name} - ${ambiente}`)
      .setDescription(description)
      .setVersion(version)
      .setContact(authorName, authorUrl, authorEmail)
      .setLicense(license, '')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();

    const modDocument = SwaggerModule.createDocument(app, modConfig, {
      include: [module],
    });
    SwaggerModule.setup(path, app, modDocument, {
      yamlDocumentUrl: 'swagger/yaml',
    });
  });
}
