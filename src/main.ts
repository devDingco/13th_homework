import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger } from 'configs/swagger.config';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// middleware -> gurad -> interceptor(before) -> pipe -> controller -> service -> repository -> interceptor(after) -> filter -> client

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        credentials: true,
    });

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, HOST);
}
bootstrap();
