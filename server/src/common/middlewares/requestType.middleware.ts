import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestTypeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req.isGraphQL = req.originalUrl === '/graphql';

        next();
    }
}
