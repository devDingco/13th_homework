import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ContextGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        if (context.getType() === 'graphql') {
            const ctx = GqlExecutionContext.create(context);
            context.switchToHttp().getRequest = () => ctx.getContext().req;
        }
        return true;
    }
}
