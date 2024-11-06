"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("../configs/swagger.config");
const PORT = process.env.PORT;
const HOST = process.env.HOST;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        credentials: true,
    });
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swagger);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT, HOST);
}
bootstrap();
//# sourceMappingURL=main.js.map