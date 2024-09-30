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
import { GqlContextType } from '@nestjs/graphql';

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
                    if (Array.isArray(data)) {
                        const deleteIdData = data.map((item) =>
                            this.removeId(item),
                        );
                        return { message, statusCode, data: deleteIdData };
                    } else if (typeof data === 'object' && data !== null) {
                        const deleteIdData = this.removeId(data);
                        return { message, statusCode, data: deleteIdData };
                    } else {
                        return { message, statusCode };
                    }
                }
            }),
        );
    }
    private removeId(item: any): any {
        if (item && item._id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...rest } = item;
            return rest;
        }
        return item;
    }
}
