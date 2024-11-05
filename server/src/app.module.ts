import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { BoardCommentModule } from './board/board-comment/board-comment.module';
import { BoardModule } from './board/board.module';
import { BoardPasswordModule } from './board/board-password/board-password.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { mongoDBConfig } from 'configs/mongoDB.config';
import { postgreSQLConfig } from 'configs/postgreSQL.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
            isGlobal: true,
        }),

        TypeOrmModule.forRootAsync({
            name: 'MongoDB',
            useClass: mongoDBConfig,
        }),
        TypeOrmModule.forRootAsync({
            name: 'PostgreSQL',
            useClass: postgreSQLConfig,
        }),
        // RedisModule.forRootAsync({
        //     // config: {
        //     //     host: process.env.REDIS_HOST || 'localhost',
        //     //     port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        //     // },
        // }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),

        BoardModule,
        BoardPasswordModule,
        BoardCommentModule,
        AuthModule,
        BcryptModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
