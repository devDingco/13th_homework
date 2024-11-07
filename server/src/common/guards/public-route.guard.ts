import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class PublicRouteGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const url =
            context.getType() === 'graphql'
                ? GqlExecutionContext.create(context).getInfo().fieldName
                : context.switchToHttp().getRequest().url;

        if (url.includes('login') || url.includes('signup')) {
            return true;
        }

        return super.canActivate(context);
    }
}
