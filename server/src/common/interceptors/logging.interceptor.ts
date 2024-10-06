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
        if (isHttp) {
            const request: Request = context.switchToHttp().getRequest();
            console.log(`Incoming ${request.method} request to ${request.url}`);
        }

        if (isGraphQL) {
            const ctx = GqlExecutionContext.create(context);

            const info = ctx.getInfo();

            const fieldName = info.path.key;
            const fieldMethod = info.path.typename;

            console.log(`Incoming GraphQL ${fieldMethod} : ${fieldName} `);
        }

        console.log('Before...');

        const now = Date.now();
        return next
            .handle()
            .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }
}
