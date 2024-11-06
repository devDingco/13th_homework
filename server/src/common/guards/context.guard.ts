import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ContextTypeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const contextType = context.getType();

        if (contextType === 'graphql') {
            const ctx = GqlExecutionContext.create(context);
            context.switchToHttp().getRequest = () => ctx.getContext().req;
        }

        return true;
    }
}
