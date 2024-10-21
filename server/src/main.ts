import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { swagger } from 'configs/swagger.config';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// middleware -> guard -> pipe -> interceptor -> exception filter

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.useGlobalFilters(new HttpExceptionFilter());

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, HOST);
}
bootstrap();
