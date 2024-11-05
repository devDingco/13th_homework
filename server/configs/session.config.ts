import * as session from 'express-session';

import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

export function sessionConfig(app: INestApplication): void {
    const configService = app.get<ConfigService>(ConfigService);

    // Redis 클라이언트 생성
    const redisClient = createClient();

    const redisStore = new RedisStore({
        client: redisClient,
        ttl: 604800,
    });

    // RedisStore를 바로 생성
    app.use(
        session({
            secret: configService.get<string>('SESSION_SECRET'),
            resave: false, // session이 변경된 경우에만 저장
            saveUninitialized: false, // session에 데이터가 들어온 경우에만 저장
            store: redisStore,
            cookie: {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 604800000, // 클라이언트 측 쿠키의 만료 시간(ms)
            },
        }),
    );
}
