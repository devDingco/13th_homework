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
        let path: string;

        if (contextType === 'http') {
            path = context.switchToHttp().getRequest().path;
        } else if (contextType === 'graphql') {
            path = GqlExecutionContext.create(context).getInfo().path.key;
        }

        if (path.includes('signup') || path.includes('login')) {
            return true;
        }

        return super.canActivate(context);
    }
}
