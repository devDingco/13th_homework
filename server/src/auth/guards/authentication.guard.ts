import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const contextType = context.getType();

        if (contextType === 'http') {
            const path = context.switchToHttp().getRequest().path;

            if (path === '/api/user/signup' || path === '/api/user/login')
                return true;
        } else if (contextType === 'graphql') {
            const fieldName =
                GqlExecutionContext.create(context).getInfo().path.key;
            if (fieldName === 'login' || fieldName === 'signUp') {
                return true;
            }
        }
        return super.canActivate(context);
    }
}
