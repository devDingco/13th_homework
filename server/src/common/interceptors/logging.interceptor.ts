import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

import { Observable } from 'rxjs';
import { Request } from 'express';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isHttp: boolean = context.getType() === 'http';
        const isGraphQL: boolean =
            context.getType<GqlContextType>() === 'graphql';

        let method = '';
        let url = '';

        if (isHttp) {
            const request: Request = context.switchToHttp().getRequest();
            method = request.method;
            url = request.url;
            console.log(`Incoming ${method} request to ${url}`);
        }

        if (isGraphQL) {
            const ctx = GqlExecutionContext.create(context);
            const info = ctx.getInfo();

            const fieldName = info.path.key;
            const fieldMethod = info.path.typename;
            method = fieldMethod;
            url = fieldName;

            console.log(`Incoming GraphQL ${method} : ${url}`);
        }

        console.log('Before...');

        const now = Date.now();

        // next.handle()는 Observable을 반환하며, 그 응답에 접근할 수 있음
        return next.handle().pipe(
            tap(() => {
                console.log(`Outgoing response for ${method} ${url}`);
                console.log(`After... ${Date.now() - now}ms`);
            }),
        );
    }
}
