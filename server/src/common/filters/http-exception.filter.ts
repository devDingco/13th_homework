import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        if (host.getType() === 'http') {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const status = exception.getStatus();

            // validation Error
            if (exception instanceof BadRequestException) {
                const responseMessage = exception.getResponse();
                return response.status(status).json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    validationErrors: responseMessage['message'],
                });
            }

            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
            });
        } else if (host.getType<GqlContextType>() === 'graphql') {
            const gqlHost = GqlArgumentsHost.create(host);

            const statusCode = exception.getStatus();
            const message = exception.getResponse();

            throw new HttpException(
                {
                    statusCode,
                    message,
                    timestamp: new Date().toISOString(),
                    path: gqlHost.getInfo().fieldName,
                },
                statusCode,
            );
        }
    }
}
