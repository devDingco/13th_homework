import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

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

    const config = new DocumentBuilder()
        .setTitle('seSAC')
        .setDescription('The seSAC API description made in RYU')
        .setVersion('1.0')
        .addTag('board', 'board API')
        .addServer(`http://${HOST}:${PORT}`)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, HOST);
}
bootstrap();
