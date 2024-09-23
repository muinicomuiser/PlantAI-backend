"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const interceptor_ok_log_interceptor_1 = require("./commons/interceptor/interceptor_ok_log.interceptor");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const httpexception_filter_1 = require("./commons/filter/httpexception.filter");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new interceptor_ok_log_interceptor_1.InterceptorOkLogInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new httpexception_filter_1.HttpExceptionFilter());
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    console.log('PUERTO: ', port);
    const name = configService.get("npm_package_name");
    const description = configService.get("npm_package_description");
    const version = configService.get("npm_package_version");
    const authorName = configService.get("npm_package_author_name");
    const authorUrl = configService.get("npm_package_author_url");
    const authorEmail = configService.get("npm_package_author_email");
    const license = configService.get("npm_package_license");
    const ambiente = configService.get('AMBIENTE');
    console.log(ambiente);
    const config = new swagger_1.DocumentBuilder()
        .setTitle(`${name} - ${ambiente}`)
        .setDescription(description)
        .setVersion(version)
        .setContact(authorName, authorUrl, authorEmail)
        .setLicense(license, '')
        .addTag('PlantAI-store-api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        yamlDocumentUrl: 'swagger/yaml',
    });
    const logger = new common_1.Logger('Main Bootstrap');
    logger.log(`Server running on http://localhost:${port}`);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map