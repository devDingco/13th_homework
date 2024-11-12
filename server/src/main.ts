import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthenticationGuard } from './common/guards/Authentication.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestTypeMiddleware } from './common/middlewares/requestType.middleware';
import { SwaggerModule } from '@nestjs/swagger';
import { graphqlUploadExpress } from 'graphql-upload';
import { sessionConfig } from 'configs/session.config';
import { swagger } from 'configs/swagger.config';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// middleware -> guard -> interceptor(before) -> pipe -> controller -> service -> repository -> interceptor(after) -> filter -> client

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
        exposedHeaders: ['Authorization'],
    });
    // middleware
    app.use(new RequestTypeMiddleware().use);

    // graphql middleware
    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

    // guard
    app.useGlobalGuards(new AuthenticationGuard());

    // interceptor
    app.useGlobalInterceptors(new LoggingInterceptor());

    // pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    // interceptor
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );

    // filter
    app.useGlobalFilters(new HttpExceptionFilter());

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('api', app, document);

    sessionConfig(app);

    await app.listen(PORT, HOST);
}
bootstrap();
