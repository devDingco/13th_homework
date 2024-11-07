import * as passport from 'passport';
import * as session from 'express-session';

import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';

export function sessionConfig(app: INestApplication): void {
    const configService = app.get<ConfigService>(ConfigService);

    const redisClient = new Redis({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
    });

    const redisStore = new RedisStore({
        client: redisClient,
        ttl: 604800,
    });

    app.use(
        session({
            secret: configService.get<string>('SESSION_SECRET'),
            resave: false,
            saveUninitialized: false,
            store: redisStore,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: 'none',
                maxAge: 604800000,
            },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
}
