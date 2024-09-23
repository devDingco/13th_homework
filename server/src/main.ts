import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

const port = process.env.PORT;
const local = process.env.DEV_URL;

// middleware -> guard -> pipe -> interceptor -> exception filter

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
        }),
    );

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('seSAC')
        .setDescription('The seSAC API description made in RYU')
        .setVersion('1.0')
        .addTag('board', 'board API')
        .addServer(`${local}${port}`)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}
bootstrap();
