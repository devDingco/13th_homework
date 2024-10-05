import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import {
    IDeleteResponse,
    IResponseInterceptor,
} from '../types/interceptor.interface';

import { GqlContextType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';

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
                if (context.getType<GqlContextType>() === 'graphql') {
                    return { data };
                } else if (context.getType() === 'http') {
                    if (data.password) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { password, ...rest } = data;
                        data = rest;
                    }
                    if (Array.isArray(data)) {
                        if (data[0].rating) {
                            return { message, statusCode, data };
                        }
                        const deleteIdData = data.map((item) =>
                            this.removeSensitiveData(item),
                        );
                        return { message, statusCode, data: deleteIdData };
                    } else if (typeof data === 'object' && data !== null) {
                        if (data.rating) {
                            return { message, statusCode, data };
                        }
                        const deleteIdData = this.removeSensitiveData(data);
                        return { message, statusCode, data: deleteIdData };
                    } else {
                        return { message, statusCode };
                    }
                }
            }),
        );
    }
    private removeSensitiveData(item: any): any {
        if (item && item._id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...rest } = item;
            return rest;
        }

        return item;
    }
}
