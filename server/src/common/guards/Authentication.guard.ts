import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = this.getRequest(context);

        if (req.isGraphQL) {
            const fieldName =
                GqlExecutionContext.create(context).getInfo().fieldName;
            if (
                fieldName === 'login' ||
                fieldName === 'signup' ||
                fieldName === 'validateNickname'
            ) {
                return true;
            }
        } else {
            const url = req.url;
            if (
                url.includes('login') ||
                url.includes('signup') ||
                url.includes('token') ||
                url.includes('validate') ||
                url.includes('upload')
            ) {
                return true;
            }
        }

        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        if (context.getType() === 'graphql') {
            const gqlContext = GqlExecutionContext.create(context);
            return gqlContext.getContext().req;
        }
        return context.switchToHttp().getRequest();
    }
}
