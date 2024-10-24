"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const interceptor_ok_log_interceptor_1 = require("./commons/interceptor/interceptor_ok_log.interceptor");
const common_1 = require("@nestjs/common");
const httpexception_filter_1 = require("./commons/filter/httpexception.filter");
const config_1 = require("@nestjs/config");
const swagger_config_1 = require("./config/swagger/swagger.config");
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
    (0, swagger_config_1.setupSwagger)(app);
    const port = app.get(config_1.ConfigService).get('PORT');
    await app.listen(port);
    const logger = new common_1.Logger('Main Bootstrap');
    logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map