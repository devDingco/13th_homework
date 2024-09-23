import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    IDeleteResponse,
    IResponseInterceptor,
} from '../types/interceptor.interface';

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, IResponseInterceptor<T> | IDeleteResponse>
{
    constructor(private readonly reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<IResponseInterceptor<T> | IDeleteResponse> {
        const message = this.reflector.get<string>(
            'response-message',
            context.getHandler(),
        );
        const statusCode = context.switchToHttp().getResponse().statusCode;

        return next.handle().pipe(
            map((data) => {
                if (data && typeof data === 'object' && data._id) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { _id, ...rest } = data;
                    return { message, statusCode, data: rest };
                }

                return { message, statusCode };
            }),
        );
    }
}
