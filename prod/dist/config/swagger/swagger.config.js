"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const carro_compras_module_1 = require("../../carro-compras/carro-compras.module");
const pedidos_module_1 = require("../../pedidos/pedidos.module");
const productos_module_1 = require("../../productos/productos.module");
const usuarios_module_1 = require("../../usuarios/usuarios.module");
const equipo_module_1 = require("../../commons/modelse3/equipo/equipo.module");
const auth_module_1 = require("../../auth/auth.module");
function setupSwagger(app) {
    const configService = app.get(config_1.ConfigService);
    const name = configService.get('npm_package_name');
    const description = configService.get('npm_package_description');
    const version = configService.get('npm_package_version');
    const authorName = configService.get('npm_package_author_name');
    const authorUrl = configService.get('npm_package_author_url');
    const authorEmail = configService.get('npm_package_author_email');
    const license = configService.get('npm_package_license');
    const ambiente = configService.get('AMBIENTE');
    const config = new swagger_1.DocumentBuilder()
        .setTitle(`${name} - ${ambiente}`)
        .setDescription(description +
        '\n \nLas documentaciones de cada módulo están disponibles en las rutas siguientes: \n\n Módulo Carro de compras: api/carro\n' +
        '\n Módulo Pedidos: api/pedidos\n' +
        '\n Módulo Productos: api/productos\n' +
        '\n Módulo Usuarios: api/usuarios\n' +
        '\n Módulo Equipo: api/equipo\n' +
        '\n Módulo Autenticación: api/aut')
        .setVersion(version)
        .setContact(authorName, authorUrl, authorEmail)
        .setLicense(license, '')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [null],
    });
    swagger_1.SwaggerModule.setup('api', app, document, {
        yamlDocumentUrl: 'swagger/yaml',
    });
    const configs = [
        { module: carro_compras_module_1.CarroComprasModule, path: 'api/carro' },
        { module: pedidos_module_1.PedidosModule, path: 'api/pedidos' },
        { module: productos_module_1.ProductosModule, path: 'api/productos' },
        { module: usuarios_module_1.UsuariosModule, path: 'api/usuarios' },
        { module: equipo_module_1.EquipoModule, path: 'api/equipo' },
        { module: auth_module_1.AuthModule, path: 'api/aut' },
    ];
    configs.forEach(({ module, path }) => {
        const modConfig = new swagger_1.DocumentBuilder()
            .setTitle(`${name} - ${ambiente}`)
            .setDescription(description)
            .setVersion(version)
            .setContact(authorName, authorUrl, authorEmail)
            .setLicense(license, '')
            .build();
        const modDocument = swagger_1.SwaggerModule.createDocument(app, modConfig, {
            include: [module],
        });
        swagger_1.SwaggerModule.setup(path, app, modDocument, {
            yamlDocumentUrl: 'swagger/yaml',
        });
    });
}
//# sourceMappingURL=swagger.config.js.map