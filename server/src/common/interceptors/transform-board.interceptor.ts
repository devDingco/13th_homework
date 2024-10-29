import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformBoardInterceptor<T> implements NestInterceptor<T, any> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data.result)) {
                    const sanitizedResult = data.result.map((item) =>
                        this.removeSensitiveData(item),
                    );
                    return {
                        ...data,
                        result: sanitizedResult,
                    };
                }

                if (typeof data === 'object' && data !== null) {
                    return this.removeSensitiveData(data);
                }

                return data;
            }),
        );
    }

    private removeSensitiveData(item: any): any {
        if (item && typeof item === 'object') {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...rest } = item;
            return rest;
        }
        return item;
    }
}
