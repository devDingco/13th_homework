import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    message: string;
    statusCode: number;
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    constructor(private readonly reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        const message = this.reflector.get<string>(
            'response-message',
            context.getHandler(),
        );
        const statusCode = context.switchToHttp().getResponse().statusCode;
        return next
            .handle()
            .pipe(map((data) => ({ message, statusCode, data })));
    }
}
